import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController} from './auth/controllers/Users.Controller'
import { UsersService } from './auth/services';
import { DatabaseModule } from './database/database.module';
import { BotModule } from './bots/bots.module';
import {SocketGateway} from './bots/services/webSocketService';
import { WsGateway } from './ws.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }),DatabaseModule, AuthModule, BotModule]
})
export class AppModule {}
