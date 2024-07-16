import { Model } from "mongoose";

export interface IError {
      en: string,
      de: string
}

export interface IErrorMethods{

}

export type IErrorModel = Model<IError, {}, IErrorMethods>;