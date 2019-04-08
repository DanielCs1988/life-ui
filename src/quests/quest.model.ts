import {Field, Int, ObjectType} from "type-graphql";
import {User} from "../users/user.model";

@ObjectType()
export class Quest {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field(type => Int)
  createdAt: number;

  @Field(type => User)
  creator: User;

  @Field({nullable: true})
  description?: string;

  @Field(type => Int, { nullable: true })
  deadline?: number;

  @Field(type => [User], { nullable: true })
  participants?: User[];
}
