import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { UsersModule } from './users/users.module';
import { QuestsModule } from './quests/quests.module';

@Module({
    imports: [
        UsersModule,
        QuestsModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
        }),
    ],
})
export class AppModule {}
