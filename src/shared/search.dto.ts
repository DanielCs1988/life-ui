import { Field, InputType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class SearchDto {
  @Field()
  @IsNotEmpty()
  field: string

  @Field()
  @IsNotEmpty()
  value: string
}
