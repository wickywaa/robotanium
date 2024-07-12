import { hash, compare } from "bcrypt";

export class PasswordService {
  encryptPassword = async (password: string): Promise<string> => {
    return await hash(password,16);
  };

  comparePasswords = async (password: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(password, encryptedPassword);
  };
}
