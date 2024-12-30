import { Session } from "inspector";
import { ILoggedInUser } from "../User";

interface camera{
    id:string;
    name:string;
    sessionId: string;
}

export interface IBot {
  _id: string,
  name: string;
  img: string;
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