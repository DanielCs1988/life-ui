import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../models/user.model'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'
import { createBaseService } from '@shared/base.service'
import { IUser } from '@users/interfaces/user.interface'
import { IBankAccount } from '@users/interfaces/bank-account.interface'
import { IAddress } from '@users/interfaces/address.interface'
import { IQuest } from '@quests/interfaces/quest.interface'

const UserBaseService = createBaseService<IUser, CreateUserDto, UpdateUserDto>()

@Injectable()
export class UserService extends UserBaseService {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) { super() }

  async getBankAccounts(userId: number): Promise<IBankAccount[]> {
    const { bankAccounts } = await this.repository.findOne(userId, {
      relations: ['bankAccounts']
    })

    return bankAccounts
  }

  async getAddresses(userId: number): Promise<IAddress[]> {
    const { addresses } = await this.repository.findOne(userId, {
      relations: ['addresses']
    })

    return addresses
  }

  async getQuestsTaken(userId: number): Promise<IQuest[]> {
    const { questsTaken } = await this.repository.findOne(userId, {
      relations: ['questsTaken']
    });

    return questsTaken
  }
}
