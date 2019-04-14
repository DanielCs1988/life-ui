import { ArgsType, Field } from "type-graphql";
import { IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from "class-validator";

@ArgsType()
export class AddressDto {
  @Field()
  @Length(5, 255)
  address: string;

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
