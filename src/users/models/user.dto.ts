import {ArgsType, Field} from "type-graphql";
import {IsEmail, IsNotEmpty, IsOptional, Length} from "class-validator";

@ArgsType()
export class UserDto {
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
  @IsEmail()
  @IsOptional()
  email?: string;
}
