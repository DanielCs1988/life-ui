import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { UpdateTrackerBaseModel } from '@shared/update-tracker-base.model';
import { User } from '@users/models/user.model';
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'

@Entity()
@ObjectType()
export class RepeatableQuest extends UpdateTrackerBaseModel implements IRepeatableQuest {
  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 100 })
  @Field()
  type: string;

  @Column('int')
  @Field(type => Int)
  cooldownInSeconds: number;

  @ManyToOne(type => User, user => user.repeatableQuests)
  @Field(type => User)
  creator: User;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;
}
