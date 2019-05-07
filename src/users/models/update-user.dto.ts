import { Field, InputType, Int } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsPositive, Length, MinLength } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field(type => Int)
  @IsPositive()
  id: number;

  @Field({ nullable: true })
  @Length(2, 100)
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @Length(2, 100)
  @IsOptional()
  lastName?: string;

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
