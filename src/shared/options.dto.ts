import { Field, InputType, Int } from 'type-graphql'
import { IsIn, IsNotEmpty, IsOptional, IsPositive } from 'class-validator'
import { SearchDto } from '@shared/search.dto'

@InputType()
export class OptionsDto {
  @Field(type => Int, { nullable: true })
  @IsPositive()
  @IsOptional()
  limit?: number

  @Field(type => Int, { nullable: true })
  @IsPositive()
  @IsOptional()
  offset?: number

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  orderBy?: string

  @Field({ nullable: true })
  @IsIn([ 'ASC', 'DESC' ])
  @IsOptional()
  orderDirection?: 'ASC' | 'DESC'

  @Field(type => SearchDto, { nullable: true })
  @IsOptional()
  search?: SearchDto
}
