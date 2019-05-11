export interface IEntity {
  id?: number;
  createdAt?: string;
}

export interface IUpdateTrackerEntity extends IEntity {
  lastUpdated?: string;
}
