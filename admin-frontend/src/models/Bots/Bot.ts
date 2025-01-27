import { Session } from "inspector";
import { ILoggedInUser } from "../User";

interface camera{
    _id:string;
    name:string;
    sessionId: string;
}

export interface IBot {
  _id: string,
  name: string;
  img: string;
  imageUrl: string;
  cameras: camera[]
}

export interface ICockpit {
  name:string,
  sessionId: string
}

export interface ICreateBotDTo {
  name: string;
  image?: File;
  password: string;
  cockpits: ICockpit[];
  botImageUrl: string;
}

export interface IBotCockpits {
  name: string;
  sessionId: string;
}


export interface IConnectedCockpit extends IBotCockpits {
  _id:string,
  player: {
    id: string | null,
    name: string | null,
  }
  status: 'online' | 'offline' | 'occupied',  
}

 export interface IConnectedBot {
  id: string,
  name: string,
  cockpits: IConnectedCockpit[],
  socketId: string,
}
export interface IConnectedCockpit extends IBotCockpits {
  player: {
    id: string | null,
    name: string | null,
  }
  status: 'online' | 'offline' | 'occupied',  
}

