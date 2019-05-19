import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, IsOptional, Length } from 'class-validator'
import { IBankAccount } from '@users/interfaces/bank-account.interface'
import { BaseDto } from '@shared/base.dto'

@InputType()
export class UpdateBankAccountDto extends BaseDto implements IBankAccount {
  @Field({ nullable: true })
  @Length(10, 50)
  @IsOptional()
  account?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
