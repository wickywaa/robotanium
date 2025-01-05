import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BotModule } from './bots/bots.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }),DatabaseModule, AuthModule, BotModule]
})
export class AppModule {}
