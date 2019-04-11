import {Module} from '@nestjs/common';
import { UserResolver } from "./user.resolver";
import { UserService } from './services/user.service';
import { BankAccountService } from "./services/bank-account.service";

@Module({
  providers: [
    UserResolver,
    UserService,
    BankAccountService,
  ],
})
export class UsersModule { }
