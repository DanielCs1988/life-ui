import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { SharedModule } from "../shared/shared.module";
import { UserResolver } from "./user.resolver";
import { UserService } from './services/user.service';
import { BankAccountService } from "./services/bank-account.service";
import {User} from "./models/user.model";
import {BankAccount} from "./models/bank-account.model";
import {QuestsModule} from "../quests/quests.module";
import {Address} from "./models/address.model";
import {AddressService} from "./services/address.service";

@Module({
  imports: [
    SharedModule,
    forwardRef(() => QuestsModule),
    TypeOrmModule.forFeature([
      User,
      BankAccount,
      Address,
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    BankAccountService,
    AddressService,
  ],
  exports: [
    UserService,
  ],
})
export class UsersModule { }
