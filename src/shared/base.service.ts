import { Repository } from 'typeorm'
import { ICrudService } from '@shared/crud-service.interface'

export function createBaseService<T, C, U>(ownerKey?: string) {
  abstract class BaseService implements ICrudService<T> {
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

      return this.repository.save(entity)
    }

    async delete(id: number): Promise<boolean> {
      const result = await this.repository.delete(id)
      return result.affected > 0
    }

    getAll(): Promise<T[]> {
      return this.repository.find()
    }

    getById(id: number): Promise<T> {
      return this.repository.findOne(id)
    }

    async update(data: U): Promise<T> {
      const entity = await this.repository.preload(data)
      return entity ? this.repository.save(entity) : entity
    }
  }

  return BaseService
}
