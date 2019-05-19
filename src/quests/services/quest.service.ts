import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quest } from '../models/quest.model';
import { createBaseService, createFieldResolver, FieldResolver } from '@shared/base.service'
import { CreateQuestDto } from '@quests/models/create-quest.dto'
import { UpdateQuestDto } from '@quests/models/update-quest.dto'
import { IQuest } from '@quests/interfaces/quest.interface'
import { IUser } from '@users/interfaces/user.interface'

const QuestBaseService = createBaseService<IQuest, CreateQuestDto, UpdateQuestDto>('quest', 'creator')

@Injectable()
export class QuestService extends QuestBaseService {
  private readonly fieldResolver: FieldResolver<Quest>

  constructor(
    @InjectRepository(Quest)
    protected readonly repository: Repository<Quest>,
  ) {
    super()
    this.fieldResolver = createFieldResolver(repository)
  }

  async getCreator(questId: number): Promise<IUser> {
    return this.fieldResolver(questId, 'creator')
  }

  async getParticipants(questId: number): Promise<IUser[]> {
    return this.fieldResolver(questId, 'participants')
  }
}
