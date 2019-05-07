import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';

import { Quest } from "../models/quest.model";
import {QuestService} from "../services/quest.service";

@Resolver(of => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) { }

  @Query(returns => [Quest])
  quests(): Promise<Quest[]> {
    return this.questService.getAll();
  }

  @Query(returns => Quest)
  async quest(@Args('id') id: number): Promise<Quest> {
    const quest = await this.questService.getById(id);
    if (!quest) {
      throw new NotFoundException(`Quest with ID ${id} does not exist.`);
    }
    return quest;
  }
}
