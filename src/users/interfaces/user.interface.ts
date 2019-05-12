import { IUpdateTrackerEntity } from '@shared/entity.interface';
import { RepeatableQuest } from '@quests/models/repeatable-quest.model';
import { IAddress } from './address.interface';
import { IBankAccount } from './bank-account.interface';
import { IQuest } from '@quests/interfaces/quest.interface';

export interface IUser extends IUpdateTrackerEntity {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  profilePictureUri?: string;
  email?: string;
  phoneNumber?: string;
  questsCreated?: IQuest[];
  questsTaken?: IQuest[];
  repeatableQuests?: RepeatableQuest[];
  bankAccounts?: IBankAccount[];
  addresses?: IAddress[];
}
