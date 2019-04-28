import { BeforeUpdate, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { BaseModel } from './base.model';

@ObjectType()
export abstract class UpdateTrackerBaseModel extends BaseModel {
  @Column({ length: 27, nullable: true })
  @Field({ nullable: true })
  lastUpdated?: string;

  @BeforeUpdate()
  setLastUpdated() {
    this.lastUpdated = new Date().toISOString();
  }
}
