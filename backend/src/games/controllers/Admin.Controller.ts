import { Body, Controller, Get, Inject, Injectable, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ICreateGame, IGame, IGameMethods, IGameModel } from '../interfaces/games.interface';
import { Model } from 'mongoose';
import { IUserMethods, User, UserModel } from 'src/auth/interfaces';
import { IBot, IBotMethods, IBotModel, IConnectedBot } from 'src/bots/interfaces';
import { BotsSChema } from 'src/bots/bots.schema';

@Injectable()
@Controller('api/admin')
export class AdminGamesController {

  constructor(
      @Inject('GAMES_MODEL')
      private gameModel: Model<IGame, IGameModel, IGameMethods>,
      @Inject('USER_MODEL')
      private userModel: Model<User, UserModel, IUserMethods>,
      @Inject('BOT_MODEL')
          private botModel: Model<IBot, IBotModel, IBotMethods>,
    ) { }

  @Post('game') 
  async createGame(@Body()body:ICreateGame, @Res()response: Response) {

    const user = await this.userModel.findById('1212');
    const bot =  await this.botModel.findById('1212');

    const newGame:IGame =  {
      name: `test game ${new Date().getTime()}`,
      startTime: new Date().getTime(),
      endTime: null,
      players:[ {
        id: user.id,
        name:'sring'
      }],
      adminPlayerId: user.id,
      bots: [bot],
      gameType: 'private',
      reason: 'test',
      chatEnabled: false,
      voiceChatEnabled: false,
      camerasEnabled: false,
      gamestopped: false,
      gamesStoppedBy: null,
      gameStoppedReason: '',
      gameinSeconds: 0,
      chat:[],
      notes: [],
    }

    const game  = new this.gameModel(newGame);

    console.log('saved Game',game)

    response.status(200).send()
  }
}