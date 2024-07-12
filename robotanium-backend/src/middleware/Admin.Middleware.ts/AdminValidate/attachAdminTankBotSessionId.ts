import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { createSessionId } from '../../../Services'
import { IconnectBot } from '../../../interfaces';
export const attachAdminTankBotSessionId = 
async ( req:IconnectBot, res:Response, next:NextFunction ) => {
  console.log(req.sessionId)
  console.log(req.body)
  try {
    await createSessionId((err, session)=>{
        if(err) throw new Error(err.message);
        if(session) req.body.sessionId = session;
        next();
    })
    
  } 
  catch(e){
    console.log(e)
      res.status(500).json({message:'could not create session'})
  }
}