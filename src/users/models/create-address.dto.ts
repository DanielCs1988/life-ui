import { Field, InputType, Int } from 'type-graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Length, Max, Min } from 'class-validator'

import { IAddress } from '@users/interfaces/address.interface'

@InputType()
export class CreateAddressDto implements IAddress {
  @Field()
  @Length(5, 255)
  address: string;

  // Temporary, until authentication is implemented
  @Field(type => Int)
  @IsPositive()
  owner: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsNumber()
  @Min(-86)
  @Max(86)
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsOptional()
  longitude?: number;
}
