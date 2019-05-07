import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICrudService } from '../../shared/CrudService';
import { RepeatableQuest } from '../models/repeatable-quest.model';
import { User } from '../../users/models/user.model';

@Injectable()
export class RepeatableQuestService implements ICrudService<RepeatableQuest> {
  constructor(
    @InjectRepository(RepeatableQuest)
    private readonly repository: Repository<RepeatableQuest>,
  ) { }

  create(data: Partial<RepeatableQuest>): Promise<RepeatableQuest> {
    const quest = this.repository.create(data);
    return this.repository.save(quest);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  getAll(): Promise<RepeatableQuest[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<RepeatableQuest> {
    return this.repository.findOne(id);
  }

  async update(data: Partial<RepeatableQuest>): Promise<RepeatableQuest> {
    const quest = await this.repository.preload(data);
    return this.repository.save(quest);
  }

  getByCreator(creator: User): Promise<RepeatableQuest[]> {
    return this.repository.find({ creator });
  }
}
