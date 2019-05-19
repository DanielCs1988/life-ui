import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RepeatableQuest } from '../models/repeatable-quest.model';
import { createBaseService, createFieldResolver, FieldResolver } from '@shared/base.service'
import { IRepeatableQuest } from '@quests/interfaces/repeatable-quest.interface'
import { IUser } from '@users/interfaces/user.interface'

const BaseRepeatableQuestService = createBaseService<IRepeatableQuest, any, any>('creator')

@Injectable()
export class RepeatableQuestService extends BaseRepeatableQuestService {
  private readonly fieldResolver: FieldResolver<RepeatableQuest>

  constructor(
    @InjectRepository(RepeatableQuest)
    protected readonly repository: Repository<RepeatableQuest>,
  ) {
    super()
    this.fieldResolver = createFieldResolver(repository)
  }

  getCreator(questId: number): Promise<IUser> {
    return this.fieldResolver(questId, 'creator')
  }
}
