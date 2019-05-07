import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

import {BankAccount} from "../models/bank-account.model";
import {User} from "../models/user.model";
import {BankAccountDto} from "../models/bank-account.dto";
import { ICrudService } from '../../shared/CrudService';

@Injectable()
export class BankAccountService implements ICrudService<BankAccount> {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    ) { }

  getAll(): Promise<BankAccount[]> {
    return this.bankAccountRepository.find();
  }

  getById(id: number): Promise<BankAccount> {
    return this.bankAccountRepository.findOne(id);
  }

  create(data: BankAccountDto): Promise<BankAccount> {
    const account = this.bankAccountRepository.create(data);
    return this.bankAccountRepository.save(account);
  }

  async update(data: BankAccount): Promise<BankAccount> {
    const account = await this.bankAccountRepository.preload(data);
    return this.bankAccountRepository.save(account);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.bankAccountRepository.delete(id);
    return result.affected > 0;
  }

  async getUserBankAccounts(owner: User): Promise<BankAccount[]>  {
    return this.bankAccountRepository.find({ owner });
  }
}
