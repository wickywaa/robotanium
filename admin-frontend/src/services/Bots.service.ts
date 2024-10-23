import { AxiosResponse } from "axios";
import { ILoggedInUser, UserType } from "../models/User";
import { adminBaseAxios } from "./Base.service";
import { ICreateBotDTo, IBot } from "../models";

export class BotsService {
  createBot = async (createBotDto: ICreateBotDTo): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', createBotDto.image)
    formData.append('name', createBotDto.name )
    try {
      return await adminBaseAxios.post("bot/bot",formData)
    } catch (e) {
      throw new Error("useers could not be loaded");
    }
  };


}
