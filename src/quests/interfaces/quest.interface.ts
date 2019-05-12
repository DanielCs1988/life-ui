import { IUpdateTrackerEntity } from '../../shared/entity.interface';
import { IUser } from '../../users/interfaces/user.interface';

export interface IQuest extends IUpdateTrackerEntity {
  name?: string;
  type?: string;
  creator?: IUser | number;
  description?: string;
  deadline?: string;
  participants?: IUser[];
}
