import { Field, InputType } from 'type-graphql';
import { IQuest } from '../interfaces/quest.interface';
import { IsOptional, Length } from 'class-validator';
import { BaseDto } from '../../shared/base.dto';

@InputType()
export class UpdateQuestDto extends BaseDto implements IQuest {
  @Field({ nullable: true })
  @Length(5, 100)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @Length(5, 100)
  @IsOptional()
  type?: string;

  @Field({ nullable: true })
  @Length(2, 4096)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @Length(24, 27)
  @IsOptional()
  deadline?: string;
}
