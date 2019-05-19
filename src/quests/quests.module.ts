import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestService } from './services/quest.service';
import { QuestResolver } from './resolvers/quest.resolver';
import { Quest } from './models/quest.model';
import { RepeatableQuest } from './models/repeatable-quest.model';
import { RepeatableQuestService } from './services/repeatable-quest.service';
import { RepeatableQuestResolver } from './resolvers/repeatable-quest.resolver';
import { SharedModule } from '@shared/shared.module'

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Quest, RepeatableQuest]),
  ],
  providers: [
    QuestResolver,
    QuestService,
    RepeatableQuestService,
    RepeatableQuestResolver,
  ],
  exports: [
    QuestService,
    RepeatableQuestService,
  ],
})
export class QuestsModule { }
