import {Module, Inject } from '@nestjs/common';
import controllers from './controllers';
import { botsProviders } from './bots.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers,
  providers: [
    ...botsProviders,
  ]
})

export class BotModule {}