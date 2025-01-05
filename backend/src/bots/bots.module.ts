import {Module, Inject } from '@nestjs/common';
import controllers from './controllers';
import { botsProviders } from './bots.providers';
import { DatabaseModule } from 'src/database/database.module';
import {SocketGateway} from './services/webSocketService'
import { AuthGuard } from './guards/AuthGuards';
import { BotAuthService } from './services/authService';

@Module({
  imports: [DatabaseModule],
  controllers,
  providers: [
    ...botsProviders,
    BotAuthService,
    SocketGateway,
    AuthGuard
  ]
})

export class BotModule {}