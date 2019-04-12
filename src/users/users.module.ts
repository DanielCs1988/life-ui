import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { SharedModule } from "../shared/shared.module";
import { UserResolver } from "./user.resolver";
import { UserService } from './services/user.service';
import { BankAccountService } from "./services/bank-account.service";
import {User} from "./models/user.model";
import {BankAccount} from "./models/bank-account.model";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      User,
      BankAccount,
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    BankAccountService,
  ],
})
export class UsersModule { }
