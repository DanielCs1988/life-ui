import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

import {BankAccount} from "../models/bank-account.model";
import {User} from "../models/user.model";
import {BankAccountDto} from "../models/bank-account.dto";

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    ) { }

  async getUserBankAccounts(owner: User): Promise<BankAccount[]>  {
    return this.bankAccountRepository.find({ owner });
  }

  createBankAccount(data: BankAccountDto): Promise<BankAccount> {
    const account = this.bankAccountRepository.create(data);
    return this.bankAccountRepository.save(account);
  }

  updateBankAccount(account: BankAccount): Promise<BankAccount> {
    return this.bankAccountRepository.save(account);
  }

  deleteBankAccount(account: BankAccount): Promise<BankAccount> {
    return this.bankAccountRepository.remove(account);
  }
}
