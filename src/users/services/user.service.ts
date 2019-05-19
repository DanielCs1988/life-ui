import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../models/user.model'
import { CreateUserDto } from '../models/create-user.dto'
import { UpdateUserDto } from '../models/update-user.dto'
import { createBaseService } from '@shared/base.service'

const UserBaseService = createBaseService<User, CreateUserDto, UpdateUserDto>()

@Injectable()
export class UserService extends UserBaseService {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) { super() }

  getCreator(questId: number): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .innerJoin('user.questsCreated', 'quest')
      .where('quest.id = :questId', { questId })
      .getOne()
  }

  getParticipants(questId: number): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .innerJoin('user.questsTaken', 'quest')
      .where('quest.id = :questId', { questId })
      .getMany()
  }
}
