import {ArgsType, Field} from "type-graphql";
import { IsEmail, IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';

@ArgsType()
export class CreateUserDto {
  @Field()
  @Length(2, 100)
  firstName: string;

  @Field()
  @Length(2, 100)
  lastName: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  nickName?: string;

  @Field({ nullable: true })
  @MinLength(10)
  @IsOptional()
  profilePictureUri?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @Length(5, 30)
  @IsOptional()
  phoneNumber?: string;
}
