import {Module, Inject } from '@nestjs/common';
import controllers from './controllers';
import { botsProviders } from './bots.providers';
import { DatabaseModule } from 'src/database/database.module';
import {SocketGateway} from './services/webSocketService'
import { AuthGuard } from './guards/AuthGuards';
import { BotAuthService } from './services/authService';
import { OpenTokService } from './services/openTokServices';

@Module({
  imports: [DatabaseModule],
  controllers,
  providers: [
    ...botsProviders,
    BotAuthService,
    SocketGateway,
    AuthGuard,
    OpenTokService
  ]
})

export class BotModule {}