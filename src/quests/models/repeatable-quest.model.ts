import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '../../users/models/user.model';
import { UpdateTrackerBaseModel } from '../../shared/update-tracker-base.model';

@Entity()
@ObjectType()
export class RepeatableQuest extends UpdateTrackerBaseModel {
  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 100 })
  @Field()
  type: string;

  @Column('int')
  @Field(type => Int)
  cooldownInDays: number;

  @ManyToOne(type => User, user => user.repeatableQuests)
  @Field(type => User)
  creator: User;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;
}
