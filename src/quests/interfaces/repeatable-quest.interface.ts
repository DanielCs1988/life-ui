import { IUpdateTrackerEntity } from '@shared/entity.interface'
import { IUser } from '@users/interfaces/user.interface'

export interface IRepeatableQuest extends IUpdateTrackerEntity {
  name?: string;
  type?: string;
  creator?: IUser | number;
  cooldownInSeconds?: number;
  description?: string;
}
