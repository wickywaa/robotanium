import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IconnectBot } from '../../../interfaces';
import {} from '../../../Services/'
export const validateAdminConnectbot = 
async ( req:IconnectBot, res:Response, next:NextFunction ) => {
  const missingFields = []
  try {
    const  { botId, email, idToken, uid, sessionId } = req.body;
    if (!sessionId?.length) return missingFields.push('sessionId');
    if(!botId?.length) return missingFields.push('botId');
    if(!email?.length) return  missingFields.push('email');
    if(!idToken?.length) return missingFields.push('idToken');
    if(!uid?.length) return missingFields.push('uid')

    if(missingFields.length) throw new Error()
    next()
  } 
  catch(e){
    if(missingFields.length) res.status(400).json({message:'missing Fields', fields: missingFields})
  }
}