import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { QuestsModule } from './quests/quests.module';

@Module({
    imports: [
        UsersModule,
        SharedModule,
        QuestsModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
        }),
    ],
})
export class AppModule {}