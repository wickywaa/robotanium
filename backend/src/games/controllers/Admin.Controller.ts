import { Body, Controller, Get, Inject, Injectable, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ICreateGame } from '../interfaces/games.interface';

@Injectable()
@Controller('api/games/admin')
export class AdminGamesController {

  constructor(
  ) {}

  @Post('game') 
  async createGame(@Body()body:ICreateGame, @Res()response: Response) {

    response.status(200).send()
  }
}