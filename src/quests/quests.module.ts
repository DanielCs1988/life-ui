import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestService } from './quest.service';
import { QuestResolver } from "./quest.resolver";
import { Quest } from "./quest.model";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Quest]),
  ],
  providers: [
    QuestResolver,
    QuestService
  ],
  exports: [
    QuestService,
  ],
})
export class QuestsModule {}
