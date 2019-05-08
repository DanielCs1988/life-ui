import { Query } from '@nestjs/graphql';
import { ClassType, Resolver } from 'type-graphql';
import { ICrudService } from './CrudService';

export function createBaseResolver<T extends ClassType>(entityName: string, type: T) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected constructor(protected readonly service: ICrudService<T>) { }

    @Query(returns => [type], { name: `${entityName}s` })
    async getAll(): Promise<T[]> {
      return this.service.getAll();
    }
  }

  return BaseResolver;
}
