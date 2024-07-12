import { Request } from 'express';

export interface IconnectBot extends Request {
  sessionId: string;
  accesstoken: string;
  botId: string;
  uid: string;
  email: string;
  idToken: string;
}