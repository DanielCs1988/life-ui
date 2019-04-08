import {Field, Int, ObjectType} from "type-graphql";
import {Quest} from "../quests/quest.model";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(type => Int)
  createdAt: number;

  @Field({nullable: true})
  nickName?: string;

  @Field({nullable: true})
  email?: string;

  @Field(type => [Quest], { nullable: true })
  questsCreated?: Quest[];

  @Field(type => [Quest], { nullable: true })
  questsTaken?: Quest[];
}