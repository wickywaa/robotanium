import { Request } from "express";

export interface IUser {
  uid:string;
  email: string;
  confirmedEmail: string;
  userName:string;
  password:string;
  rank: IUserRank;
  created_at?:string;
  updated_at?:string;
}

export enum IUserRank {
  Newb='Apprentice',
  Warrior='Warrior',
  Legend='Legend',
  Myth='Myth',
  God='God',
}

export interface userobject {
  Action: string;
  Username: string;
  UserId: string;
  email: string;
  socketId: string;
}

export interface botObject {
  botId: string;
  socketId: string;
  userName: string | undefined;
  userUid: string | undefined;
}

export interface messageObject {
  userName: string;
  message: string;
}

export interface gameInfo {
  id: string;
  endTime: number;
  botId: string;
}

export interface RequestCustom extends Request {
  body: {
    idToken: string;
  };
}
export interface RequestBotId extends Request {
  body: {
    idToken: string;
    botId: string;
    gameId: string;
  };
}

export interface AddUserRequest extends Request {
  body: {
    idToken: string;
    gameId: string;
    userId: string;
  };
}
