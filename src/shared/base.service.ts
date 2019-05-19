import { FindManyOptions, getConnection, Like, Repository } from 'typeorm'
import { ICrudService } from '@shared/crud-service.interface'
import { OptionsDto } from '@shared/options.dto'
import { ICacheOptions } from '@shared/types'

export function createBaseService<T, C extends T, U extends T>(entityName: string, ownerKey?: string) {
  const cache = {
    id: entityName,
    milliseconds: 3600000,  // 1 hour
  }

  abstract class BaseService implements ICrudService<T> {
    private readonly connection = getConnection()
    protected abstract readonly repository: Repository<T>

    create(data: C): Promise<T> {
      const entity = ownerKey
        ? this.repository.create({
          ...data,
          [ownerKey]: {
            id: data[ownerKey]
          }
        })
        : this.repository.create(data)
      this.invalidateCache()

      return this.repository.save(entity)
    }

    async delete(id: number): Promise<boolean> {
      const result = await this.repository.delete(id)
      this.invalidateCache()

      return result.affected > 0
    }

    getAll(options?: OptionsDto): Promise<T[]> {
      return options
        ? this.repository.find(createQueryOptions(options, cache))
        : this.repository.find({ cache })
    }

    getById(id: number): Promise<T> {
      return this.repository.findOne(id)
    }

    async update(data: U): Promise<T> {
      const entity = await this.repository.preload(data)
      this.invalidateCache()

      return entity ? this.repository.save(entity) : entity
    }

    private invalidateCache() {
      this.connection.queryResultCache.remove([entityName])
    }
  }

  return BaseService
}

const createQueryOptions = ({ limit, offset, orderBy, orderDirection = 'ASC', search }: OptionsDto, cache: ICacheOptions): FindManyOptions => {
  const options: FindManyOptions = { cache }

  if (orderBy) {
    options.order = {
      [orderBy]: orderDirection
    }
  }
  if (limit) {
    options.take = limit
  }
  if (offset) {
    options.skip = offset
  }
  if (search) {
    options.where = {
      [search.field]: Like(`%${search.value}%`)
    }
  }

  return options
}

export type FieldResolver<T> = (id: number, fieldName: string) => any

export const createFieldResolver = <T>(repository: Repository<T>): FieldResolver<T> => async (id: number, fieldName: string) => {
  const entity = await repository.findOne(id, {
    relations: [fieldName]
  })

  return entity[fieldName]
}
