import {} from "../interfaces/OpenTokAPi/generateToken";

declare global {
  namespace Express {
    interface Request {
      sessionid: string;
      accesstoken: string;
      token: gen;
    }
  }
}
