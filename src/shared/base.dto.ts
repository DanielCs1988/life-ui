import { Field, InputType, Int } from 'type-graphql';
import { IsPositive } from 'class-validator';

/**
 * Base class for for update DTO.
 * Contains the ID field used across the app.
 */
@InputType()
export abstract class BaseDto {
  @Field(type => Int)
  @IsPositive()
  id: number;
}
