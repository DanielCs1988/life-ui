import { Field, InputType, Int } from 'type-graphql'
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'
import { IsOptional, IsPositive, Length, Max, Min } from 'class-validator'

@InputType()
export class CreateRepeatableQuestDto implements IRepeatableQuest {
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

  @Field(type => Int, { nullable: true })
  @Min(3600)
  @Max(2678400)
  @IsOptional()
  cooldownInSeconds?: number;

  @Field({ nullable: true })
  @Length(2, 4096)
  @IsOptional()
  description?: string;
}
