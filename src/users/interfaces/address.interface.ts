import { IEntity } from '../../shared/entity.interface';
import { User } from '../models/user.model';

export interface IAddress extends IEntity {
  address?: string;
  owner?: User;
  name?: string;
  latitude?: number;
  longitude?: number;
}
