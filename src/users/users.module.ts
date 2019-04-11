import {Module} from '@nestjs/common';

import { SharedModule } from "../shared/shared.module";
import { UserResolver } from "./user.resolver";
import { UserService } from './services/user.service';
import { BankAccountService } from "./services/bank-account.service";

@Module({
  imports: [
    SharedModule,
  ],
  providers: [
    UserResolver,
    UserService,
    BankAccountService,
  ],
})
export class UsersModule { }
