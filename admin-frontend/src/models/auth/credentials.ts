export interface ILoginCredentials {
  email: string;
  password: string;
  token?:string;
}

export interface IRegisterCredentials {
  userName?: string;
  email: string;
  password: string;
}