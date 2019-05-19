import { Inject } from '@nestjs/common'
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express';

import { createBaseResolver } from '@shared/base.resolver'
import { Tokens } from '@constants/tokens'
import { BankAccount } from '@users/models/bank-account.model'
import { CreateBankAccountDto } from '@users/models/create-bank-account.dto'
import { UpdateBankAccountDto } from '@users/models/update-bank-account.dto'
import { IUser } from '@users/interfaces/user.interface'
import { BankAccountService } from '@users/services/bank-account.service'

const BaseBankAccountResolver = createBaseResolver({
  name: 'bankAccount',
  entity: BankAccount,
  createDto: CreateBankAccountDto,
  updateDto: UpdateBankAccountDto,
})

@Resolver(of => BankAccount)
export class BankAccountResolver extends BaseBankAccountResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: BankAccountService,
  ) { super() }

  @ResolveProperty()
  owner(@Parent() account: BankAccount): Promise<IUser> {
    return this.service.getOwner(account.id)
  }
}
