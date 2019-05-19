import { Inject } from '@nestjs/common';
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { Tokens } from '@constants/tokens';
import { createBaseResolver } from '@shared/base.resolver';

import { Quest } from "../models/quest.model";
import {QuestService} from "../services/quest.service";
import { CreateQuestDto } from '../models/create-quest.dto';
import { UpdateQuestDto } from '../models/update-quest.dto';
import { IUser } from '@users/interfaces/user.interface'

const QuestBaseResolver = createBaseResolver({
  name: 'quest',
  entity: Quest,
  createDto: CreateQuestDto,
  updateDto: UpdateQuestDto,
});

@Resolver(of => Quest)
export class QuestResolver extends QuestBaseResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: QuestService,
  ) { super(); }

  @ResolveProperty()
  async creator(@Parent() quest: Quest): Promise<IUser> {
    return this.service.getCreator(quest.id);
  }

  @ResolveProperty()
  async participants(@Parent() quest: Quest): Promise<IUser[]> {
    return this.service.getParticipants(quest.id);
  }
}
