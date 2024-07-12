import * as mongoose from 'mongoose';

export type IBotModel = mongoose.Model<IBot, {}, IBotMethods>;


export interface IBotCameras {
  name: string;
  sessionId: string;
}

export interface ICreateBotDto {
  name:string;
  cameras: IBotCameras[],
  imageUrl: string,
}

export interface IBotMethods {
  
}

export interface IBot {
  name: string;
  token: string;
  cameras: IBotCameras[];
  imageUrl: string,
  userId: mongoose.Schema.Types.ObjectId;
}