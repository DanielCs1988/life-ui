import { Inject } from '@nestjs/common'
import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { Tokens } from '@constants/tokens'
import { createBaseResolver } from '@shared/base.resolver'
import { User } from '../models/user.model'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'
import { IBankAccount } from '@users/interfaces/bank-account.interface'
import { IAddress } from '@users/interfaces/address.interface'
import { IQuest } from '@quests/interfaces/quest.interface'
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'

const UserBaseResolver = createBaseResolver({
  name: 'user',
  entity: User,
  createDto: CreateUserDto,
  updateDto: UpdateUserDto,
})

@Resolver(of => User)
export class UserResolver extends UserBaseResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: UserService,
  ) { super() }

  @ResolveProperty()
  async bankAccounts(@Parent() user: User): Promise<IBankAccount[]> {
    return this.service.getBankAccounts(user.id)
  }

  @ResolveProperty()
  async addresses(@Parent() user: User): Promise<IAddress[]> {
    return this.service.getAddresses(user.id)
  }

  @ResolveProperty()
  async questsCreated(@Parent() user: User): Promise<IQuest[]> {
    return this.service.getQuestsCreated(user.id)
  }

  @ResolveProperty()
  async repeatableQuests(@Parent() user: User): Promise<IRepeatableQuest[]> {
    return this.service.getRepeatableQuests(user.id)
  }

  @ResolveProperty()
  async questsTaken(@Parent() user: User): Promise<IQuest[]> {
    return this.service.getQuestsTaken(user.id)
  }
}
