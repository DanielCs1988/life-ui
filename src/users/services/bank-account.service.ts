import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

import {BankAccount} from "../models/bank-account.model";
import {User} from "../models/user.model";

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    ) { }

  async getUserBankAccounts(owner: User): Promise<BankAccount[]>  {
    return this.bankAccountRepository.find({ owner });
  }
}
