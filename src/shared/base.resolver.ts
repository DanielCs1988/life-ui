import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { ClassType, Int, Resolver } from 'type-graphql';
import { PubSub } from 'apollo-server-express';

import { ICrudService } from './crud-service.interface';
import { IdArgs } from './types';
import { capitalize } from './utils';
import {IEntity} from "@shared/entity.interface";

export interface ICreateBaseResolverParams<T, C, U> {
  name: string;
  pluralName?: string;
  entity: T;
  createDto: C;
  updateDto: U;
}

export function createBaseResolver<T extends ClassType, C extends ClassType, U extends ClassType>(
  params: ICreateBaseResolverParams<T, C, U>
) {
  const { name, entity, createDto, updateDto } = params;
  const { pluralName = `${name}s` } = params;
  const ucName = capitalize(name);
  const events = {
    CREATED: `${name}Created`,
    UPDATED: `${name}Updated`,
    DELETED: `${name}Deleted`,
  };

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected abstract readonly service: ICrudService<any>;
    protected abstract readonly pubSub: PubSub;

    @Query(returns => [entity], { name: pluralName })
    async getAll(): Promise<T[]> {
      return this.service.getAll();
    }

    @Query(returns => entity, { name })
    async get(@Args() { id }: IdArgs): Promise<T> {
      const entity = await this.service.getById(id);
      if (!entity) {
        throw new NotFoundException(`${ucName} with ID ${id} does not exist.`);
      }
      return entity;
    }

    @Mutation(returns => entity, { name: `create${ucName}` })
    async create(@Args({ name: 'data', type: () => createDto }) createDto: C): Promise<T> {
      const newEntity = await this.service.create(createDto);
      this.pubSub.publish(events.CREATED, { [events.CREATED]: newEntity });
      return newEntity;
    }

    @Mutation(returns => entity, { name: `update${ucName}` })
    async update(@Args({ name: 'data', type: () => updateDto }) updateDto: U): Promise<T> {
      const newEntity = await this.service.update(updateDto);
      if (!newEntity) {
        throw new NotFoundException(`${ucName} with ID ${(<IEntity>updateDto).id} does not exist.`);
      }
      this.pubSub.publish(events.UPDATED, { [events.UPDATED]: newEntity });
      return newEntity;
    }

    @Mutation(returns => Boolean, { name: `delete${ucName}` })
    async delete(@Args() { id }: IdArgs): Promise<boolean> {
      const isDeleted = await this.service.delete(id);
      if (isDeleted) {
        this.pubSub.publish(events.DELETED, { [events.DELETED]: id });
        return isDeleted;
      }
      throw new NotFoundException(`${ucName} with ID ${id} does not exist.`);
    }

    @Subscription(returns => entity, { name: events.CREATED })
    created(): AsyncIterator<T> {
      return this.pubSub.asyncIterator(events.CREATED);
    }

    @Subscription(returns => entity, { name: events.UPDATED })
    updated(): AsyncIterator<T> {
      return this.pubSub.asyncIterator(events.UPDATED);
    }

    @Subscription(returns => Int, { name: events.DELETED })
    deleted(): AsyncIterator<number> {
      return this.pubSub.asyncIterator(events.DELETED);
    }
  }

  return BaseResolver;
}
