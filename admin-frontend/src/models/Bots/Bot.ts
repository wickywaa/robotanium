import { ILoggedInUser } from "../User";

export interface IBot {
  id: string,
  name: string;
  img: string;
}

export interface ICreateBotDTo {
  name: string;
  image: File;
  password: string;
  cockits: string[];
}