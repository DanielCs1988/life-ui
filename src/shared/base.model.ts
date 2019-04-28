import { Field, Int, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 27 })
  @Field()
  createdAt: string;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
