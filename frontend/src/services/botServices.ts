import { ICreateBotDTo } from "../models/Bots/bots";
import {baseAxios} from "./baseService"

export class BotService {

  createBot = async (bot: ICreateBotDTo): Promise<void> => {
    console.log('called the bot service')
    let  formData = new FormData()

    const payload = {
      botName: bot.name,
      password: bot.password,
      cockpits: bot.cockpits
    }

    if (bot.image )formData.append("image", bot.image);
    formData.append("payload",JSON.stringify(payload))

    try {
      return baseAxios.post<{ data:{ bot: ICreateBotDTo }, file:File}>('bots',formData,{ headers: {
        'Content-Type': 'multipart/form-data'
      }}
    )
    } catch (e) {
      throw new Error("Invalid");
    }
  }

}