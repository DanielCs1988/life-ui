import { Field, InputType, Int } from 'type-graphql'
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'
import { IsOptional, Length, Max, Min } from 'class-validator'
import { BaseDto } from '@shared/base.dto'

@InputType()
export class UpdateRepeatableQuestDto extends BaseDto implements IRepeatableQuest {
  @Field({ nullable: true })
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @Length(5, 100)
  @IsOptional()
  type?: string;

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
