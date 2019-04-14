export interface ICrudService<T, I = number> {
  getAll(): Promise<T[]>;
  getById(id: I): Promise<T>;
  create(createDto: Partial<T>): Promise<T>;
  update(updateDto: Partial<T>): Promise<T>;
  delete(id: I): Promise<boolean>;
}
