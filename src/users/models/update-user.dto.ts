import { Field, InputType } from 'type-graphql';
import { IsEmail, IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';
import { BaseDto } from '@shared/base.dto';
import { IUser } from '../interfaces/user.interface';

@InputType()
export class UpdateUserDto extends BaseDto implements IUser {
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
