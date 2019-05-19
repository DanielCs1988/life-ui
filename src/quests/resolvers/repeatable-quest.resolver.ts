import { Inject } from '@nestjs/common'
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { RepeatableQuest } from '../models/repeatable-quest.model'
import { RepeatableQuestService } from '../services/repeatable-quest.service'
import { createBaseResolver } from '@shared/base.resolver'
import { CreateRepeatableQuestDto } from '@quests/models/create-repeatable-quest.dto'
import { UpdateRepeatableQuestDto } from '@quests/models/update-repeatable-quest.dto'
import { Tokens } from '@constants/tokens'
import { IUser } from '@users/interfaces/user.interface'

const RepeatableQuestBaseResolver = createBaseResolver({
  name: 'repeatableQuest',
  entity: RepeatableQuest,
  createDto: CreateRepeatableQuestDto,
  updateDto: UpdateRepeatableQuestDto,
})

@Resolver(of => RepeatableQuest)
export class RepeatableQuestResolver extends RepeatableQuestBaseResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: RepeatableQuestService,
  ) { super() }

  @ResolveProperty()
  creator(@Parent() quest: RepeatableQuest): Promise<IUser> {
    return this.service.getCreator(quest.id)
  }
}
