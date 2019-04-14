import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Query, Resolver, Args, ResolveProperty, Parent, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Int } from 'type-graphql';

import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { BankAccount } from './models/bank-account.model';
import { BankAccountService } from './services/bank-account.service';
import { IdArgs } from '../shared/types';
import { CreateUserDto } from './models/create-user.dto';
import { SubscriptionTypes } from '../constants/subscription-types';
import { Tokens } from '../constants/tokens';
import { Quest } from '../quests/quest.model';
import { QuestService } from '../quests/quest.service';
import { AddressService } from './services/address.service';
import { Address } from './models/address.model';
import { UpdateUserDto } from './models/update-user.dto';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly bankAccountService: BankAccountService,
    private readonly addressService: AddressService,
    private readonly questService: QuestService,
    @Inject(Tokens.PUB_SUB) private readonly pubSub: PubSub,
  ) { }

  @Query(returns => [ User ])
  async users(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Query(returns => User)
  async user(@Args() { id }: IdArgs): Promise<User> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @ResolveProperty()
  async bankAccounts(@Parent() user: User): Promise<BankAccount[]> {
    return this.bankAccountService.getUserBankAccounts(user);
  }

  @ResolveProperty()
  async questsCreated(@Parent() user: User): Promise<Quest[]> {
    return this.questService.getQuestByCreator(user);
  }

  @ResolveProperty()
  async addresses(@Parent() user: User): Promise<Address[]> {
    return this.addressService.getUserAddresses(user);
  }

  // TODO: error handling for mutations
  @Mutation(returns => User)
  async createUser(@Args() user: CreateUserDto): Promise<User> {
    const userCreated = await this.userService.create(user);
    this.pubSub.publish(SubscriptionTypes.USER_CREATED, { userCreated });
    return userCreated;
  }

  @Mutation(returns => User)
  async updateUser(@Args() user: UpdateUserDto): Promise<User> {
    const userUpdated = await this.userService.update(user);
    this.pubSub.publish(SubscriptionTypes.USER_UPDATED, { userUpdated });
    return userUpdated;
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args() { id }: IdArgs): Promise<boolean> {
    const isDeleted = await this.userService.delete(id);
    if (isDeleted) {
      this.pubSub.publish(SubscriptionTypes.USER_DELETED, { userDeleted: id });
    }
    return isDeleted;
  }

  @Subscription(returns => User)
  userCreated(): AsyncIterator<User> {
    return this.pubSub.asyncIterator(SubscriptionTypes.USER_CREATED);
  }

  @Subscription(returns => User)
  userUpdated(): AsyncIterator<User> {
    return this.pubSub.asyncIterator(SubscriptionTypes.USER_UPDATED);
  }

  @Subscription(returns => Int)
  userDeleted(): AsyncIterator<number> {
    return this.pubSub.asyncIterator(SubscriptionTypes.USER_DELETED);
  }
}
