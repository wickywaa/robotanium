import * as mongoose from 'mongoose';

export type IBotModel = mongoose.Model<IBot, {}, IBotMethods>;


export interface IBotCockpits {
  _id: string;
  name: string;
  sessionId: string;
  accessToken: string;
}

export interface ICreateBotDto {
  name:string;
  cockpits: IBotCockpits[],
  imageUrl: string,
  password:string,
  adminId: string
}

export interface IBotMethods {
  
}

export interface IBot {
  id: string;
  name: string;
  token: string;
  cameras: IBotCockpits[];
  imageUrl: string
}

export interface botAuth {
  type: 'bot',
  password: string,
  name: string,
  botId: string,
  camId: string,
  camName: string
}

export interface userAuth {
  type: 'user',
  token: string,
  id: string,
}

export type connectedClient = userAuth | botAuth


export interface IConnectedCockpit extends IBotCockpits {
  id?: string,	
  player: {
    id: string | null,
    name: string | null,
  }
  status: 'online' | 'offline' | 'occupied',  
}

export interface IConnectedBot {
  _id?: string,
  name: string,
  cockpits: IConnectedCockpit[],
  socketId: string,
  adminId: string
}


export interface IConnectedUser {
  id: string,
  socketId: string,
  userName: string,
}

export interface IConnectedCockpit extends IBotCockpits {
  player: {
    id: string | null,
    name: string | null,
  }
  status: 'online' | 'offline' | 'occupied',  
}

export interface IConnectUserToCockpit {
  userId: string,
  cockpits: string []
}