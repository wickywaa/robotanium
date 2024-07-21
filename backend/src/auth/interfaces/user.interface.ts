import { Model } from "mongoose";

export interface User {
  email: string;
  isRobotaniumAdmin: boolean;
  isPlayerAdmin: boolean;
  password: string;
  userName: string;
  authTokens: string[];
  registrationToken: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  passwordResetToken: string;
  imgsrc: string;
  changePassword: boolean;
  theme: string;
  rememberme: boolean;
}

export interface ILoginCredentials {
  user: User,
  email: string;
  password: string;
}

export interface ICreateAdminUser {
  email: string;
  userName: string;
}

export interface IChangePassword {
  user:User;
  oldPassword: string;
  newPassword: string;
}
export interface IChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IEmailConfirmationDto {
  registrationToken: string;
  email: string;
}

export interface IForgotPasswordDto{
  email: string;
  code: string;
}

export type PublicProfile = Omit<User, "password" | "authtokens" | "passwordResetTokens" | "registrationtoken" >;

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  getPublicProfile(): PublicProfile;
  generateConfirmEmailDto(): Promise<IEmailConfirmationDto>;
  confirmEmail(body: IEmailConfirmationDto): Promise<boolean>;
  generateForgotPasswordDto(code:string):Promise<IForgotPasswordDto>;
}

export type UserModel = Model<User, {}, IUserMethods>;