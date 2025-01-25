import mongoose from "mongoose";
import { IBot, IConnectedBot, IConnectedUser } from "src/bots/interfaces";

export type IGameModel = mongoose.Model<IGame, {}, IGameMethods>;


export interface ICreateGame {
  game: string;
}

export interface IGame {
  name:string,
  startTime: number,
  endTime: number, 
  players:  {
    id: string,
    name: string,
  }[]
  adminPlayerId: string;
  bots: IBot[];
  gameType: 'public' | 'private',
  reason: 'game' | 'practise' | 'test',
  chatEnabled: boolean;
  voiceChatEnabled: boolean;
  camerasEnabled: boolean;
  gamestopped: boolean;
  gamesStoppedBy: mongoose.Schema.Types.ObjectId | null;
  gameStoppedReason: string;
  gameinSeconds: number;
  chat: {
    userId: string;
    message: string;
  }[]
  notes: {
    adminId: string;
    note: string;
  }[]
}

export interface IGameMethods {

}

