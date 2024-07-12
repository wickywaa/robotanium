import { NextFunction,Request,Response } from "express";
import  {ParamsDictionary} from  "express-serve-static-core"
import  { RequestCustom} from '../interfaces/userInterfaces'


const userAuth = (req:RequestCustom , res:Response , next: NextFunction) => {
    if (req.body.idToken && typeof req.body.idToken === 'string' && req.body.idToken.length > 0) {
  
    } else {
      res.status(400).json({
        error: {
          message: "id Token not recognized or not given",
        },
      });
      return;
    }
  };