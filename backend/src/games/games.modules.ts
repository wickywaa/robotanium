import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { controllers } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: controllers,
  providers: []
})

export class GamesModule {}