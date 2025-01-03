import { Controller, Inject, Injectable, Post, Body, Res, Get,Delete, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { Response } from 'express';
import { Multer } from 'multer';
import { Model } from 'mongoose';
import { IBot, IBotMethods, IBotModel, ICreateBotDto } from '../interfaces';
import { User } from 'src/auth/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
@Controller('api/admin')

export class BotsUsersController {

  constructor(
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
  ) { }

  @Post('bot')
  @UseInterceptors(FileInterceptor('file'))
  async createBot(@Body() body:ICreateBotDto,@UploadedFile() file: Express.Multer.File, @Res() res: Response) {

    try {
      const newBot:IBot = {
        name: body.name,
        token: '',
        cameras: body.cockpits,
        imageUrl: body.imageUrl,
      }
    
      const bot = new this.botModel(newBot);
      await bot.save();
      const bots = await this.botModel.find({});
      if(!bots) throw new Error('bots could not be loaded');
      return res.status(201).json({bots})
    }
    catch (e) {
      console.log('could not create bot')
      return res.status(500).send({ message: e.message });
    }
  }

  @Get('/bots')
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

  @Delete('bot/:id')
  async deleteUserById(@Res() response:Response, @Param('id') id: string) {
  
    console.log('deletring', id)
    
    try {
      const bot = await this.botModel.findByIdAndDelete(id);
      if(!bot) return response.status(400).json({error:'bot not found'})
      const bots = await this.botModel.find();

      if(bot && bots) return response.status(200).json({bots})
    }
    catch(e) {
      return response.status(500).json({message:'could not delete bot'})
    }

}
}
