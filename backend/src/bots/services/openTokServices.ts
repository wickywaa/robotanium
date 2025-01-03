const OpenTok = require("opentok")
const opentok = new OpenTok(process.env.OPENTOK_API_KEY, process.env.OPENTOK_SECRET);


export class OpenTokService {

  createAccesstoken = (sessionId:string) => opentok.generateToken(sessionId);
  createSessionID = () => opentok.createSession();
}