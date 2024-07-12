import { Controller, Inject, Injectable, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { Model } from 'mongoose';
import { IBot, IBotMethods, IBotModel } from '../interfaces';

@Injectable()
@Controller('api/bots')

export class BotsUsersController {

  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
  ) { }

  @Post('bot')
  async createBot(@Body() bot: IBot, @Res() res: Response) {


    try {
      return res.status(201).send('test');
    }
    catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
}