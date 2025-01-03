import {Module, Inject } from '@nestjs/common';
import controllers from './controllers';
import { botsProviders } from './bots.providers';
import { DatabaseModule } from 'src/database/database.module';
import {SocketGateway} from './services/webSocketService'

@Module({
  imports: [DatabaseModule],
  controllers,
  providers: [
    ...botsProviders,
    SocketGateway
  ]
})

export class BotModule {}