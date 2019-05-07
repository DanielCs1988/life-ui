import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { RepeatableQuest } from '../models/repeatable-quest.model';
import { RepeatableQuestService } from '../services/repeatable-quest.service';
import { IdArgs } from '../../shared/types';

@Resolver(of => RepeatableQuest)
export class RepeatableQuestResolver {
  constructor(private readonly questService: RepeatableQuestService) { }

  @Query(returns => [RepeatableQuest])
  repeatableQuests(): Promise<RepeatableQuest[]> {
    return this.questService.getAll();
  }

  @Query(returns => RepeatableQuest)
  async repeatableQuest(@Args() { id }: IdArgs): Promise<RepeatableQuest> {
    const quest = this.questService.getById(id);
    if (!quest) {
      throw new NotFoundException(`RepeatableQuest with ID ${id} does not exist.`)
    }
    return quest;
  }
}
