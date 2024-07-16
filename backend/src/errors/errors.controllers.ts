import { Body, Controller, Get, Inject, Injectable, Post, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { IErrorMethods, IErrorModel, IError } from './interfaces';

@Injectable()
@Controller("api/errors")

export class ErrorController {

  constructor(
    @Inject('ERRORS_MODEL')
    private errorsModel: Model<IError, IErrorModel, IErrorMethods>,
  ) { }


  @Post('error')
  async createNewError (@Body()body:{error:IError}) {

  }
}

