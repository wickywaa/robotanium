export interface ILoggedInUser {
  _id: string,
  email: string,
  isRobotaniumAdmin: boolean,
  isPlayerAdmin: boolean,
  userName: string,
  imgsrc: string,
  isActive: boolean,
  isEmailVerified: boolean,
  changePassword: boolean,
  rememberme: false,
  theme: string,
}

export interface IEditUser extends ILoggedInUser {
  password: string;
}

export type UserType = "player" | "admin"