import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@users/models/user.model';
import { Quest } from '../models/quest.model';
import { createBaseService } from '@shared/base.service'
import { CreateQuestDto } from '@quests/models/create-quest.dto'
import { UpdateQuestDto } from '@quests/models/update-quest.dto'
import { IQuest } from '@quests/interfaces/quest.interface'

const QuestBaseService = createBaseService<IQuest, CreateQuestDto, UpdateQuestDto>('creator')

@Injectable()
export class QuestService extends QuestBaseService {
  constructor(
    @InjectRepository(Quest)
    protected readonly repository: Repository<Quest>,
  ) { super() }

  async getQuestsByCreator(creator: User): Promise<Quest[]> {
    return this.repository.find({ creator });
  }

  getQuestsTaken(userId: number): Promise<Quest[]> {
    return this.repository
      .createQueryBuilder('quest')
      .innerJoin('quest.participants', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
