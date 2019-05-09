import { Inject } from '@nestjs/common';
import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { BankAccount } from '../models/bank-account.model';
import { BankAccountService } from '../services/bank-account.service';
import { CreateUserDto } from '../models/create-user.dto';
import { Tokens } from '../../constants/tokens';
import { Quest } from '../../quests/models/quest.model';
import { QuestService } from '../../quests/services/quest.service';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { UpdateUserDto } from '../models/update-user.dto';
import { RepeatableQuestService } from '../../quests/services/repeatable-quest.service';
import { RepeatableQuest } from '../../quests/models/repeatable-quest.model';
import { createBaseResolver } from '../../shared/base.resolver';

const UserBaseResolver = createBaseResolver('user', User, CreateUserDto, UpdateUserDto);

@Resolver(of => User)
export class UserResolver extends UserBaseResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: UserService,
    private readonly bankAccountService: BankAccountService,
    private readonly addressService: AddressService,
    private readonly questService: QuestService,
    private readonly repeatableQuestService: RepeatableQuestService,
  ) { super(); }

  @ResolveProperty()
  async bankAccounts(@Parent() user: User): Promise<BankAccount[]> {
    return this.bankAccountService.getUserBankAccounts(user);
  }

  @ResolveProperty()
  async questsCreated(@Parent() user: User): Promise<Quest[]> {
    return this.questService.getQuestsByCreator(user);
  }

  @ResolveProperty()
  async repeatableQuests(@Parent() user: User): Promise<RepeatableQuest[]> {
    return this.repeatableQuestService.getByCreator(user);
  }

  @ResolveProperty()
  async addresses(@Parent() user: User): Promise<Address[]> {
    return this.addressService.getUserAddresses(user);
  }
}
