
export interface IUserCredentials {
  email: string;
  password: string;
};

export const emptyLoginForm = {
  email: "",
  password: "",
};


export type currentFields = "email" | "password";
