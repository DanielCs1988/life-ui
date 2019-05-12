import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { QuestsModule } from '@quests/quests.module';

@Module({
  imports: [
    UsersModule,
    QuestsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'life_ui',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {
}
