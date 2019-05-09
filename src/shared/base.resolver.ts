import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { ClassType, Int, Resolver } from 'type-graphql';
import { PubSub } from 'apollo-server-express';

import { ICrudService } from './CrudService';
import { IdArgs } from './types';
import { capitalize } from './utils';

// TODO: error handling
export function createBaseResolver<T extends ClassType, C extends ClassType, U extends ClassType>(
  entityName: string, type: T, createDto: C, updateDto: U
) {
  const ucName = capitalize(entityName);
  const events = {
    CREATED: `${entityName}Created`,
    UPDATED: `${entityName}Updated`,
    DELETED: `${entityName}Deleted`,
  };

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected abstract readonly service: ICrudService<any>;
    protected abstract readonly pubSub: PubSub;

    @Query(returns => [type], { name: `${entityName}s` })
    async getAll(): Promise<T[]> {
      return this.service.getAll();
    }

    @Query(returns => type, { name: `${entityName}` })
    async get(@Args() { id }: IdArgs): Promise<T> {
      const entity = this.service.getById(id);
      if (!entity) {
        throw new NotFoundException(`${ucName} with ID ${id} does not exist.`);
      }
      return entity;
    }

    @Mutation(returns => type, { name: `create${ucName}` })
    async create(@Args({ name: 'data', type: () => createDto }) createDto: C): Promise<T> {
      const userCreated = await this.service.create(createDto);
      this.pubSub.publish(events.CREATED, { userCreated });
      return userCreated;
    }

    @Mutation(returns => type, { name: `update${ucName}` })
    async update(@Args({ name: 'data', type: () => updateDto }) updateDto: U): Promise<T> {
      const userUpdated = await this.service.update(updateDto);
      this.pubSub.publish(events.UPDATED, { userUpdated });
      return userUpdated;
    }

    @Mutation(returns => Boolean, { name: `delete${ucName}` })
    async delete(@Args() { id }: IdArgs): Promise<boolean> {
      const isDeleted = await this.service.delete(id);
      if (isDeleted) {
        this.pubSub.publish(events.DELETED, { userDeleted: id });
      }
      return isDeleted;
    }

    @Subscription(returns => type)
    userCreated(): AsyncIterator<T> {
      return this.pubSub.asyncIterator(events.CREATED);
    }

    @Subscription(returns => type)
    userUpdated(): AsyncIterator<T> {
      return this.pubSub.asyncIterator(events.UPDATED);
    }

    @Subscription(returns => Int)
    userDeleted(): AsyncIterator<number> {
      return this.pubSub.asyncIterator(events.DELETED);
    }
  }

  return BaseResolver;
}
