import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IconnectBot } from '../../../interfaces'
import { createSessionToken } from '../../../Services';
import { IGeneratetoken } from '../../../interfaces';

export const attachAdminTankBotSessionToken =
  async (req: IconnectBot, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
      const sessionArgs: IGeneratetoken = {
        role: 'publisher',
        sessionId: req.body.sessionId,
        expireTime: new Date().getTime() + 30000000, //5 minutes
      }
      await createSessionToken(sessionArgs)
      .then((token:string)=> req.accesstoken = token)
      .catch((e)=>{
        throw new Error(e)
      })
      next()
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message: 'could not create session token' });
    }
  }