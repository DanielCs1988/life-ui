import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";

import { User } from "./user.model";
import { BaseModel } from '@shared/base.model';

@Entity()
@ObjectType()
export class BankAccount extends BaseModel {
  @Column({ length: 50 })
  @Field()
  account: string;

  @ManyToOne(type => User, user => user.bankAccounts)
  @Field(type => User)
  owner: User;

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  name?: string;
}
