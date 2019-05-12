import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICrudService } from '@shared/crud-service.interface';
import { User } from '@users/models/user.model';
import { Quest } from '../models/quest.model';
import { CreateQuestDto } from '../models/create-quest.dto';

@Injectable()
export class QuestService implements ICrudService<Quest> {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
  ) { }

  create(data: CreateQuestDto): Promise<Quest> {
    const quest = this.questRepository.create({
      ...data,
      creator: {
        id: data.creator
      }
    });
    return this.questRepository.save(quest);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.questRepository.delete(id);
    return result.affected > 0;
  }

  getAll(): Promise<Quest[]> {
    return this.questRepository.find();
  }

  getById(id: number): Promise<Quest> {
    return this.questRepository.findOne(id);
  }

  async update(data: Partial<Quest>): Promise<Quest> {
    const quest = await this.questRepository.preload(data);
    return this.questRepository.save(quest);
  }

  async getQuestsByCreator(creator: User): Promise<Quest[]> {
    return this.questRepository.find({ creator });
  }

  async getQuestsByParticipant(participant: User): Promise<Quest[]> {
    // TODO: many to many
    return [];
  }
}
