import { Inject } from '@nestjs/common';
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { Tokens } from '@constants/tokens';
import { createBaseResolver } from '@shared/base.resolver';
import { UserService } from '@users/services/user.service';
import { User } from '@users/models/user.model';

import { Quest } from "../models/quest.model";
import {QuestService} from "../services/quest.service";
import { CreateQuestDto } from '../models/create-quest.dto';
import { UpdateQuestDto } from '../models/update-quest.dto';

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
    private readonly userService: UserService,
  ) { super(); }

  @ResolveProperty()
  async creator(@Parent() quest: Quest): Promise<User> {
    return this.userService.getCreator(quest.id);
  }

  @ResolveProperty()
  async participants(@Parent() quest: Quest): Promise<User[]> {
    return this.userService.getParticipants(quest.id);
  }
}
