import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from 'class-validator'

import { BaseDto } from '@shared/base.dto'
import { IAddress } from '@users/interfaces/address.interface'

@InputType()
export class UpdateAddressDto extends BaseDto implements IAddress {
  @Field({ nullable: true })
  @Length(5, 255)
  @IsOptional()
  address?: string;

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
