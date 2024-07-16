import  * as mongoose from 'mongoose';
import {IError, IErrorModel, IErrorMethods} from './interfaces';

export const ErrorsSchema = new mongoose.Schema<IError, IErrorModel, IErrorMethods>({
  en: {type:String},
  de: {type:String}
})