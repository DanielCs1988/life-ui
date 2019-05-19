import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@shared/shared.module'
import { UserResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'
import { BankAccountService } from './services/bank-account.service'
import { User } from './models/user.model'
import { BankAccount } from './models/bank-account.model'
import { Address } from './models/address.model'
import { AddressService } from './services/address.service'
import { AddressResolver } from '@users/resolvers/address.resolver'

@Module({
  imports: [
    SharedModule,
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
    AddressResolver,
  ],
  exports: [
    UserService,
  ],
})
export class UsersModule {}
