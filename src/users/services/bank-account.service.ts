import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BankAccount } from '../models/bank-account.model'
import { createBaseService, createFieldResolver, FieldResolver } from '@shared/base.service'
import { IBankAccount } from '@users/interfaces/bank-account.interface'
import { UpdateBankAccountDto } from '@users/models/update-bank-account.dto'
import { CreateBankAccountDto } from '@users/models/create-bank-account.dto'
import { IUser } from '@users/interfaces/user.interface'

const BankAccountBaseService = createBaseService<IBankAccount, CreateBankAccountDto, UpdateBankAccountDto>('bankAccount', 'owner')

@Injectable()
export class BankAccountService extends BankAccountBaseService {
  private readonly fieldResolver: FieldResolver<BankAccount>

  constructor(
    @InjectRepository(BankAccount)
    protected readonly repository: Repository<BankAccount>,
  ) {
    super()
    this.fieldResolver = createFieldResolver(repository)
  }

  getOwner(accountId: number): Promise<IUser> {
    return this.fieldResolver(accountId, 'owner')
  }
}
