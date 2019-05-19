import { IEntity } from '@shared/entity.interface';
import { IUser } from './user.interface';

export interface IBankAccount extends IEntity {
  account?: string;
  owner?: IUser | number;
  name?: string;
}
