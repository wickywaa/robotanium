import axios from "axios";
import { ICreateTankBot } from "../Models/Bots";

const baseUrl = process.env.REACT_APP_API_URL;

export const saveTankBot = async (tankBot: ICreateTankBot) => await axios.post(`${baseUrl}/createtankbot`, tankBot);

export interface IConnectBotCredentials {
  botId: string;
  idToken: string;
  uid: string;
  email: string;
  sessionId: string;
}

export const getSessionAndAccessToken = async (credentials: IConnectBotCredentials) => {
  return (await axios.post(`${baseUrl}/botconnect`, credentials)).data;
};
