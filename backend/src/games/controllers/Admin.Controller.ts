import { Body, Controller, Get, Inject, Injectable, Post, Res, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CreateGameDto, ICreateGame, IGame, IGameMethods, IGameModel } from '../interfaces/games.interface';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { IUserMethods, User, UserModel } from 'src/auth/interfaces';
import { IBot, IBotMethods, IBotModel, IConnectedBot } from 'src/bots/interfaces';
import { BotsSChema } from 'src/bots/bots.schema';

@Injectable()
@Controller('api/admin')
export class AdminGamesController {

  constructor(
    @Inject('GAME_MODEL')
    private gameModel: Model<IGame, IGameModel, IGameMethods>,
    @Inject('USER_MODEL')
    private userModel: Model<User, UserModel, IUserMethods>,
    @Inject('BOT_MODEL')
    private botModel: Model<IBot, IBotModel, IBotMethods>,
  ) { }

  @Post('game')
  async createGame(@Body() body: CreateGameDto, @Res() response: Response) {

    try {
      const allPlayerIds = body.players.map((player) => mongoose.Types.ObjectId.createFromTime(parseInt(player)));
      const findPlayers = await this.userModel.find({ _id: { $in: body.players } });

      console.log('all players', findPlayers)

      const allBotIds = body.bots.map((bot) => mongoose.Types.ObjectId.createFromTime(parseInt(bot._id)))
      const bots = await this.botModel.find({ _id: { $in: body.bots.map((bot) => bot._id) } });

      const botsArray = bots.map((dbbot) => {

        console.log('here is the cocpit id',)

        console.log('dbbot', dbbot)
        return {
          _id: dbbot._id,
          cockpits: body.bots.find((reqbot) => reqbot._id === dbbot._id.toString()).cockpits.map((cockpit) => {
            return {
              _id: new mongoose.Types.ObjectId(cockpit._id),
              userId: new mongoose.Types.ObjectId(cockpit.userId),
            }
          })
        }
      })


      console.log('new bots array', botsArray[0])

      console.log('allbotsid', allBotIds)
      console.log('selectedBots', bots)


      const newGame: IGame = {
        name: `test game ${new Date().getTime()}`,
        startTime: new Date().getTime(),
        endTime: null,
        players: allPlayerIds,
        adminPlayerId: new mongoose.Types.ObjectId(body.adminPlayerId),
        bots: botsArray,
        gameType: 'private',
        reason: 'test',
        chatEnabled: false,
        voiceChatEnabled: false,
        camerasEnabled: false,
        gamestopped: false,
        gamesStoppedBy: null,
        gameStoppedReason: '',
        gameinSeconds: 0,
        chat: [],
        notes: [],
      }

      const game = await new this.gameModel(newGame)

      await game.save();
      const newGames = await this.gameModel.find();
      response.status(200).json({
        newGames
      })

      console.log('saved Game', game)

    } catch (e) {
      response.status(400).json({ e })
    }


  }

  @Get('games')

  async getAllGames(@Res() response: Response) {

    const games = await this.gameModel.find();


    return response.status(200).json({
      games
    });

  }

  @Delete('games')
  async deleteAllGames(@Res() response: Response) {

    const games = await this.gameModel.find()

    await games.find(async (game) => {

      await this.gameModel.findByIdAndDelete(game._id)
    });

    const newGames = await this.gameModel.find()


    return response.status(200).json({
      newGames
    });

  }

  @Delete('game/:id')
  async deleteGameById(@Res() response: Response) {
    const games = await this.gameModel.find();


    return response.status(200).json({
      games
    });

  }
}

