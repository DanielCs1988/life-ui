import { Injectable } from '@nestjs/common';
import {BANK_ACCOUNTS} from "../../shared/mockdata";
import {BankAccount} from "../models/bank-account.model";

@Injectable()
export class BankAccountService {
  async getUserBankAccounts(ownerId: number): Promise<BankAccount[]>  {
    return BANK_ACCOUNTS.filter(account => account.owner.id === ownerId);
  }
}
