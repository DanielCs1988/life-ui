import { Module } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';

import { Tokens } from "@constants/tokens";

@Module({
  providers: [
    {
      provide: Tokens.PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [
    Tokens.PUB_SUB,
  ]
})
export class SharedModule {}
