import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { QuestService } from './services/quest.service';
import { QuestResolver } from './resolvers/quest.resolver';
import { Quest } from './models/quest.model';
import { RepeatableQuest } from './models/repeatable-quest.model';
import { RepeatableQuestService } from './services/repeatable-quest.service';
import { RepeatableQuestResolver } from './resolvers/repeatable-quest.resolver';

@Module({
  imports: [
    forwardRef(() => UsersModule),
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
