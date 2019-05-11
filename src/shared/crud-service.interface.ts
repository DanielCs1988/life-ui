export interface ICrudService<T, I = number> {
  getAll(): Promise<T[]>;
  getById(id: I): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(data: Partial<T>): Promise<T>;
  delete(id: I): Promise<boolean>;
}
