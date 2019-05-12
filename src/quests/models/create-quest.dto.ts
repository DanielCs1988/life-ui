import { Field, InputType, Int } from 'type-graphql';
import { IQuest } from '../interfaces/quest.interface';
import { IsOptional, IsPositive, Length } from 'class-validator';

@InputType()
export class CreateQuestDto implements IQuest {
  @Field()
  @Length(5, 100)
  name: string;

  @Field()
  @Length(5, 100)
  type: string;

  // Temporary, until authentication is implemented
  @Field(type => Int)
  @IsPositive()
  creator: number;

  @Field({ nullable: true })
  @Length(2, 4096)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @Length(24, 27)
  @IsOptional()
  deadline?: string;
}
