import { IGeneratetoken } from "../interfaces";

const OpenTok = require("opentok");

const opentok = new OpenTok(
  "47758991",
  "389edc986b187938f0e2b7f55dde9fdd205bdc86"
);

export const createSessionId = async(callback:(err:Error,token:string)=>void) => {
  return await opentok.createSession({mediaMode:'relayed'}, (err:Error, session:{sessionId:string}) => {
    if (err) return  callback(err, undefined)
    return callback(undefined,session.sessionId)
})

};
 export const createSessionToken = async(options:IGeneratetoken):Promise<string> => {
  const {role, sessionId, expireTime} = options
  return await opentok.generateToken(sessionId, {
    role,
    expireTime,
    //data: "name=Johnny",
    //initialLayoutClassList: ["focus"],
  })
};

module.exports = {
  createSessionId,
  createSessionToken
};
