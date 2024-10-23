import { Controller, Inject, Injectable, Post, Body, Res, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { Multer } from 'multer';
import { Model } from 'mongoose';
import { IBot, IBotMethods, IBotModel, ICreateBotDto } from '../interfaces';
import { User } from 'src/auth/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
@Controller('api/bots')

export class BotsUsersController {

  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
  ) { }

  @Post('bot')
  @UseInterceptors(FileInterceptor('file'))
  async createBot(@Body() body:ICreateBotDto,@UploadedFile() file: Express.Multer.File, @Res() res: Response) {

    try {
      console.log('here is the name  from the body', body.name);
      console.log('here is the user from the body', body.cockpits);
      console.log('here is the image from the body', body.imageUrl);
      console.log('here is the file', file)
      return res.status(201).send('test');
    }
    catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }

  @Get('bots')
  async getAllBots(@Res()res: Response) {
    try {
      const bots = await this.botModel.find({});
      if(!bots) return res.status(404).json({
        message: {
          error: 'no bots found',
        }
      })
      return res.status(200).json({
        bots,
      });
    }
    catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
}