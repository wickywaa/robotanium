import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdminAuthMiddleware, UserAuthMiddleware } from './middleware';
import {ErrorController} from './errors.controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ ErrorController  ],
  providers: []
  
})
export class ErrorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AdminAuthMiddleware)
    .exclude(
      {path: 'api/errors/', method: RequestMethod.GET},
    ).forRoutes('api/errors')
}
}