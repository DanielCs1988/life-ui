import { Injectable } from '@nestjs/common';
import {Quest} from "./quest.model";
import {QUESTS} from "../shared/mockdata";

@Injectable()
export class QuestService {
  async getAllQuests(): Promise<Quest[]>  {
    return QUESTS;
  }

  async getQuest(id: number): Promise<Quest> {
    return QUESTS.find(quest => quest.id === id);
  }
}
