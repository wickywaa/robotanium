import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BotModule } from './bots/bots.module';
import { GamesModule } from './games/games.modules';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }),DatabaseModule, AuthModule, BotModule, GamesModule]
})
export class AppModule {}
