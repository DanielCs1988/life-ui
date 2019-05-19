import { IEntity } from '@shared/entity.interface';
import { IUser } from '@users/interfaces/user.interface'

export interface IAddress extends IEntity {
  address?: string;
  owner?: IUser | number;
  name?: string;
  latitude?: number;
  longitude?: number;
}
