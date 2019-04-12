import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestService } from './quest.service';
import { QuestResolver } from "./quest.resolver";
import { Quest } from "./quest.model";

@Module({
  imports: [
    TypeOrmModule.forFeature([Quest]),
  ],
  providers: [
    QuestResolver,
    QuestService
  ]
})
export class QuestsModule {}
