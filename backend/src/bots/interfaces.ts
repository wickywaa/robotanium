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
  image: File
}

export interface IBotMethods {
  
}

export interface IBot {
  name: string;
  token: string;
  cameras: IBotCockpits[];
  imageUrl: string,
}