import * as mongoose from 'mongoose';
import { IBot, IBotMethods, IBotModel, IBotCameras } from './interfaces';

export interface Bot {
  name: string;
  token: string;
  cameras: IBotCameras,
  mainPhotoUrl: string,
  otherPhotosUrls: string[],
  userId: mongoose.Schema.Types.ObjectId;
}

export const BotsSChema = new mongoose.Schema<IBot, IBotModel, IBotMethods>({

  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },

  name: {
    type:String,
    required: true,
    unique:true,
    validate(value:string){
      if(value.length < 2 || value.length > 20) {
        throw new Error(`The Bot Name must be between 2 and 20 characters`)
      }
    }
  },

  token:{
    type: String,
  },

  cameras: {
    type: [{
      name: String,
      sessionId: String
    }],
    validate(cameras: IBotCameras[]) {
      const duplicates = cameras.filter((camera, index) => cameras.indexOf(camera) !== index);
      if( duplicates.length) {
        throw new Error(`Each camera name needs to be unique`);
      }
    }
  },

  imageUrl: {
    type: String
  },
})