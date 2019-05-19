import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

import {BankAccount} from "../models/bank-account.model";
import {User} from "../models/user.model";
import {BankAccountDto} from "../models/bank-account.dto";
import { createBaseService } from '@shared/base.service'

const BankAccountBaseService = createBaseService<BankAccount, BankAccountDto, BankAccountDto>()

@Injectable()
export class BankAccountService extends BankAccountBaseService {
  constructor(
    @InjectRepository(BankAccount)
    protected readonly repository: Repository<BankAccount>,
    ) { super() }

  async getUserBankAccounts(owner: User): Promise<BankAccount[]>  {
    return this.repository.find({ owner });
  }
}
