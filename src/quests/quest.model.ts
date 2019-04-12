import {Field, Int, ObjectType} from "type-graphql";
import {User} from "../users/models/user.model";
import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Quest {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 100 })
  @Field()
  type: string;

  @Column({ length: 20 })
  @Field()
  createdAt: string;

  @ManyToOne(type => User, user => user.questsCreated)
  @Field(type => User)
  creator: User;

  @Column('text', { nullable: true })
  @Field({nullable: true})
  description?: string;

  @Column({ length: 20, nullable: true })
  @Field({ nullable: true })
  deadline?: string;

  @ManyToMany(type => User, user => user.questsTaken, { nullable: true })
  @Field(type => [User], { nullable: true })
  participants?: User[];
}
