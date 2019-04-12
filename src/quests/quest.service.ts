import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Quest } from "./quest.model";

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
  ) { }

  async getAllQuests(): Promise<Quest[]>  {
    return this.questRepository.find();
  }

  async getQuest(id: number): Promise<Quest> {
    return this.questRepository.findOne(id);
  }
}
