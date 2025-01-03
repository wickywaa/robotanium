import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WsGateway } from './ws.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly wsGateway: WsGateway
  ) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }



  @Get()
  getHellosocket(): string {
    if (true){
      this.wsGateway.handleConsolelog()
    }
    return "Success";
  }
}
