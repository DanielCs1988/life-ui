import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.model";

@Entity()
@ObjectType()
export class BankAccount {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  account: string;

  @Column({ length: 20 })
  @Field()
  createdAt: string;

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  name?: string;

  @ManyToOne(type => User, user => user.bankAccounts)
  @Field(type => User)
  owner: User;
}
