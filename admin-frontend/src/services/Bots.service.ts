import { AxiosResponse } from "axios";
import { ILoggedInUser, UserType } from "../models/User";
import { adminBaseAxios } from "./Base.service";
import { ICreateBotDTo, IBot } from "../models";

export class BotsService {
  createBot = async (createBotDto: ICreateBotDTo): Promise<AxiosResponse> => {

    console.log('create bots dto', createBotDto)
    const formData = new FormData();
    const bodyData =  {
      name: createBotDto.name,
      cockpits: createBotDto.cockpits
    }
    formData.append('file', createBotDto.image)
    try {
      return await adminBaseAxios.post("/bot",{...bodyData,formData})
      .then((response)=>{
        return response.data
      })
    } catch (e:any) {
      throw new Error("bot could not be created", e);
    }
  };


}
