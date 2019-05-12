import { Field, ObjectType } from 'type-graphql';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { UpdateTrackerBaseModel } from '@shared/update-tracker-base.model';
import { Quest } from '@quests/models/quest.model';
import { RepeatableQuest } from '@quests/models/repeatable-quest.model';
import { BankAccount } from './bank-account.model';
import { Address } from './address.model';
import { IUser } from '../interfaces/user.interface';
import { IAddress } from '../interfaces/address.interface';
import { IBankAccount } from '../interfaces/bank-account.interface';

@Entity()
@ObjectType()
export class User extends UpdateTrackerBaseModel implements IUser {
  @Column({ length: 100 })
  @Field()
  firstName: string;

  @Column({ length: 100 })
  @Field()
  lastName: string;

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  nickName?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  profilePictureUri?: string;

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column({ length: 30, nullable: true })
  @Field({ nullable: true })
  phoneNumber?: string;

  @OneToMany(type => Quest, quest => quest.creator, { nullable: true })
  @Field(type => [Quest], { nullable: true })
  questsCreated?: Quest[];

  @ManyToMany(type => Quest, quest => quest.participants, { nullable: true })
  @JoinTable()
  @Field(type => [Quest], { nullable: true })
  questsTaken?: Quest[];

  @OneToMany(type => RepeatableQuest, quest => quest.creator, { nullable: true })
  @Field(type => [RepeatableQuest], { nullable: true })
  repeatableQuests?: RepeatableQuest[];

  @OneToMany(type => BankAccount, bankAccount => bankAccount.owner, { nullable: true })
  @Field(type => [BankAccount], { nullable: true })
  bankAccounts?: IBankAccount[];

  @OneToMany(type => Address, address => address.owner, { nullable: true })
  @Field(type => [Address], { nullable: true })
  addresses: IAddress[];

  @AfterLoad()
  swapNullCollections() {
    if (!this.questsTaken) {
      this.questsTaken = [];
    }
    if (!this.questsCreated) {
      this.questsCreated = [];
    }
    if (!this.bankAccounts) {
      this.bankAccounts = [];
    }
    if (!this.addresses) {
      this.addresses = [];
    }
  }
}
