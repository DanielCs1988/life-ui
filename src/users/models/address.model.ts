import { Field, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";

import { User } from "./user.model";
import { BaseModel } from '../../shared/base.model';

@Entity()
@ObjectType()
export class Address extends BaseModel {
  @Column()
  @Field()
  address: string;

  @ManyToOne(type => User, user => user.addresses)
  @Field(type => User)
  owner: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column('double precision', { nullable: true })
  @Field(type => Float, { nullable: true })
  latitude?: number;

  @Column('double precision', { nullable: true })
  @Field(type => Float, { nullable: true })
  longitude?: number;
}
