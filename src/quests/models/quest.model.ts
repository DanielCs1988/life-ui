import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { IQuest } from '../interfaces/quest.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { UpdateTrackerBaseModel } from '@shared/update-tracker-base.model';
import { User } from '@users/models/user.model';

@Entity()
@ObjectType()
export class Quest extends UpdateTrackerBaseModel implements IQuest {
  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 100 })
  @Field()
  type: string;

  @ManyToOne(type => User, user => user.questsCreated)
  @Field(type => User)
  creator: IUser;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ length: 20, nullable: true })
  @Field({ nullable: true })
  deadline?: string;

  @ManyToMany(type => User, user => user.questsTaken, { nullable: true })
  @Field(type => [User], { nullable: true })
  participants?: IUser[];
}
