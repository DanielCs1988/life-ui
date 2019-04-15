import {Field, Int, ObjectType} from "type-graphql";
import {
  AfterLoad,
  BeforeInsert, BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import {Quest} from "../../quests/quest.model";
import {BankAccount} from "./bank-account.model";
import {Address} from "./address.model";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 100 })
  @Field()
  firstName: string;

  @Column({ length: 100 })
  @Field()
  lastName: string;

  @Column({ length: 27 })
  @Field()
  createdAt: string;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = new Date().toISOString();
  }

  @Column({ length: 27, nullable: true })
  @Field({ nullable: true })
  lastUpdated?: string;

  @BeforeUpdate()
  setLastUpdated() {
    this.lastUpdated = new Date().toISOString();
  }

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

  @OneToMany(type => BankAccount, bankAccount => bankAccount.owner, { nullable: true })
  @Field(type => [BankAccount], { nullable: true })
  bankAccounts?: BankAccount[];

  @OneToMany(type => Address, address => address.owner, { nullable: true })
  @Field(type => [Address], { nullable: true })
  addresses: Address[];

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
