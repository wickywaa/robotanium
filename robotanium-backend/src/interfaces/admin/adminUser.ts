import {IsNotEmpty, IsEmail, IsString} from 'class-validator';


export class AdminLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}


export enum IAdminUserRoles {
  SuperAdmin = "superAdmin",
  Admin = "admin"
}

export interface IAdminUser {
  uid: string;
  email: string;
  role: IAdminUserRoles;
  firstName:string;
  lastName:string;
  password: string;
  isActive:boolean;
  created_at?: string;
  updated_at?: string;
}
