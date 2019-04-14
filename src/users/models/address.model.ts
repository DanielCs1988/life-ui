import { Field, Float, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

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
