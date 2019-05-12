import { Inject } from '@nestjs/common';
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { Quest } from "../models/quest.model";
import {QuestService} from "../services/quest.service";
import { createBaseResolver } from '../../shared/base.resolver';
import { CreateQuestDto } from '../models/create-quest.dto';
import { UpdateQuestDto } from '../models/update-quest.dto';
import { Tokens } from '../../constants/tokens';
import { User } from '../../users/models/user.model';
import { UserService } from '../../users/services/user.service';

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

  // TODO: should it be fetched from quest or user service?
  // @ResolveProperty()
  // creator(@Parent() quest: Quest): Promise<User> {
  //   return this.userService.getById(quest.creator.id)
  // }
}
