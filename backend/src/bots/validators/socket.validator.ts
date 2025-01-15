import { User } from "src/auth/interfaces";
import { botAuth, connectedClient, IBot, userAuth } from "../interfaces";
var jwt = require('jsonwebtoken');

export const authDTOIsValid = (authData:connectedClient) => {
  if(!authData) return false;
  if(!authData?.type) return false;
  if(authData.type !== 'bot' && authData.type !== 'user') return false;
  if(authData.type === 'bot') return isBotAuthDtoValid(authData);
  if(authData.type === 'user') return isUserAuthDtoValid(authData)
}

export const isUserAuthDtoValid = (user: userAuth) => {
 if(!user.id) return false;
 if(user.id.length < 5) return false;
 if(user.token?.length >5) return false;
}

export const isBotAuthDtoValid = (bot: botAuth) => {

  if(!bot.botId?.length) return false;
  if(!bot.camId?.length) return false;
  if(!bot.name?.length) return false;
  if(!bot.password?.length) return false;
  if(!bot.camName?.length) return false;
}

export const userAuthValid = (authData:userAuth) => {
  var decoded = jwt.verify(authData.token, 'supersecretpassword');
  const {_id:id, iat} = decoded;
  if(new Date().getTime() - (iat * 1000)  >= 86400000 ) return false ;
}

export const botAuthValid = (bot:IBot, authData:botAuth) => {

  if(bot.id !== authData.botId) return false;
  const camera = bot.cameras.find((camera)=>camera.name);
  if(!camera) return false;
  if(bot.name !== authData.name) return false;
}