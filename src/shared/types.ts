import { ArgsType, Field, Int, ObjectType } from 'type-graphql';
import { Min } from "class-validator";

@ArgsType()
export class IdArgs {
  @Field(type => Int)
  @Min(1)
  id: number;
}

@ObjectType()
export class Id {
  @Field(type => Int)
  id: number;
}

export interface ICacheOptions {
  id: string
  milliseconds: number
}
