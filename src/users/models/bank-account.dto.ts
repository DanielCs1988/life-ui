import { Field, InputType } from 'type-graphql';
import { IsNotEmpty, IsOptional, Length } from "class-validator";

@InputType()
export class BankAccountDto {
  @Field()
  @Length(10, 50)
  account: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
