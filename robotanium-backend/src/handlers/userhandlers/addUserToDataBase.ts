import { NextFunction, Response } from "express";
import { AddUserToDataBaseRequest } from "../../interfaces/";

export const addDbUserHandler = (req: AddUserToDataBaseRequest, res: Response, next: NextFunction) => {
  /*  const newUser = new User({
          name:'Gav',
          email:'gavnewton27@gmail.com',
          confirmedEmail:'',
          preferred_username:'newUser',
          location:'Berlin',
          rank:'Private',
          uid:'1234',
        })
        return next();
        newUser.save().then(()=>{
          return next();
        }).catch((error)=>{
          res.send({error:{
            message:`could not save user ${error}`
          }})
        }) */
  return next();
};
