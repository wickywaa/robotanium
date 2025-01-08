import * as mongoose from 'mongoose';

export type IBotModel = mongoose.Model<IBot, {}, IBotMethods>;


export interface IBotCockpits {
  name: string;
  sessionId: string;
}

export interface ICreateBotDto {
  name:string;
  cockpits: IBotCockpits[],
  imageUrl: string,
  password:string
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