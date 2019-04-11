import { Field, Int, ObjectType } from "type-graphql";
import {User} from "./user.model";

@ObjectType()
export class BankAccount {
  @Field(type => Int)
  id: number;

  @Field()
  account: string;

  @Field({ nullable: true })
  name?: string;

  @Field(type => User)
  owner: User;
}
