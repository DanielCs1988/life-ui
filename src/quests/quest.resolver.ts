import { Resolver, Query, Args } from '@nestjs/graphql';
import { Quest } from "./quest.model";
import {QuestService} from "./quest.service";

@Resolver(of => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) { }

  @Query(returns => [Quest])
  async quests(): Promise<Quest[]> {
    return this.questService.getAllQuests();
  }

  @Query(returns => Quest)
  async quest(@Args('id') id: number): Promise<Quest> {
    return this.questService.getQuest(id);
  }
}
