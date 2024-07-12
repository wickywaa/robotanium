import { NextFunction,Request,Response } from "express";
import  { RequestBotId} from '../interfaces/userInterfaces'

const userAuth = (req:RequestBotId , res:Response , next: NextFunction) => {
    if (req.body.idToken && typeof req.body.idToken === 'string' && req.body.idToken.length > 0) {
      return next()
    } else {
      res.status(400).json({
        error: {
          message: "id Token not recognized or not given",
        },
      });
      return;
    }
  };