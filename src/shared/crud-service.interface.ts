import { OptionsDto } from '@shared/options.dto'

export interface ICrudService<T, I = number> {
  getAll(options?: OptionsDto): Promise<T[]>;
  getById(id: I): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(data: Partial<T>): Promise<T>;
  delete(id: I): Promise<boolean>;
}
