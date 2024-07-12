import { IUser } from "../userInterfaces"

export interface  AddUserToDataBaseRequest {
    body:{
        user:IUser
    }
}