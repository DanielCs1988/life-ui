import { Field, InputType, Int } from 'type-graphql'
import { IsNotEmpty, IsOptional, IsPositive, Length } from 'class-validator'
import { IBankAccount } from '@users/interfaces/bank-account.interface'

@InputType()
export class CreateBankAccountDto implements IBankAccount {
  @Field()
  @Length(10, 50)
  account: string;

  // Temporary, until authentication is implemented
  @Field(type => Int)
  @IsPositive()
  owner: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
