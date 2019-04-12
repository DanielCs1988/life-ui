import {Field, Int, ObjectType} from "type-graphql";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Quest} from "../../quests/quest.model";
import {BankAccount} from "./bank-account.model";

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

  @Column({ length: 20 })
  @Field()
  createdAt: string;

  @Column({ length: 100, nullable: true })
  @Field({nullable: true})
  nickName?: string;

  @Column({ length: 100, nullable: true })
  @Field({nullable: true})
  email?: string;

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
}
