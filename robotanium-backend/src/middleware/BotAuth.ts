import { NextFunction,Request,Response } from "express";
import  {ParamsDictionary} from  "express-serve-static-core"
import  { RequestCustom} from '../interfaces/userInterfaces'

const botAuth = ((req:Request, res:Response, next:NextFunction)=>{

    const passwordIsCorrect =()=>{
        return true
    }

    if(passwordIsCorrect()){
        next()
    }
  })