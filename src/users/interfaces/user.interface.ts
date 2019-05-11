import { IUpdateTrackerEntity } from '../../shared/entity.interface';
import { Quest } from '../../quests/models/quest.model';
import { RepeatableQuest } from '../../quests/models/repeatable-quest.model';
import { IAddress } from './address.interface';
import { IBankAccount } from './bank-account.interface';

export interface IUser extends IUpdateTrackerEntity {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  profilePictureUri?: string;
  email?: string;
  phoneNumber?: string;
  questsCreated?: Quest[];
  questsTaken?: Quest[];
  repeatableQuests?: RepeatableQuest[];
  bankAccounts?: IBankAccount[];
  addresses?: IAddress[];
}
