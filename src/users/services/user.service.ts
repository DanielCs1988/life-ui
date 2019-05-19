import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../models/user.model'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'
import { createBaseService, createFieldResolver, FieldResolver } from '@shared/base.service'
import { IUser } from '@users/interfaces/user.interface'
import { IBankAccount } from '@users/interfaces/bank-account.interface'
import { IAddress } from '@users/interfaces/address.interface'
import { IQuest } from '@quests/interfaces/quest.interface'
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'

const UserBaseService = createBaseService<IUser, CreateUserDto, UpdateUserDto>('user')

@Injectable()
export class UserService extends UserBaseService {
  private readonly fieldResolver: FieldResolver<User>

  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super()
    this.fieldResolver = createFieldResolver(repository)
  }

  async getBankAccounts(userId: number): Promise<IBankAccount[]> {
    return this.fieldResolver(userId, 'bankAccounts')
  }

  async getAddresses(userId: number): Promise<IAddress[]> {
    return this.fieldResolver(userId, 'addresses')
  }

  async getQuestsCreated(userId: number): Promise<IQuest[]> {
    return this.fieldResolver(userId, 'questsCreated')
  }

  async getQuestsTaken(userId: number): Promise<IQuest[]> {
    return this.fieldResolver(userId, 'questsTaken')
  }

  async getRepeatableQuests(userId: number): Promise<IRepeatableQuest[]> {
    return this.fieldResolver(userId, 'repeatableQuests')
  }
}
