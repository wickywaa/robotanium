import { ILoggedInUser, UserType } from "../models/User";
import { adminBaseAxios } from "./Base.service";

export class UserManagementService {
  getAllUSers = async (): Promise<ILoggedInUser[]> => {
    try {
      const users = await adminBaseAxios.get<{ users: ILoggedInUser[] }>("users").then((response) => {
        return response.data.users
      });

      if (!users) throw new Error("users could not be loaded");
      return users;
    } catch (e) {
      throw new Error("useers could not be loaded");
    }
  };


  inviteNewUser = async (user: { email: string, userName: string, userType:UserType }): Promise<ILoggedInUser[]> => {
    const { email, userName, userType } = user;
    try {
      return await adminBaseAxios.post<{ users: ILoggedInUser[] }>("/user", { email, userName, userType }).then((response) => {
        return response.data.users;
      })
    }
    catch (e: any) {
      if (e.response.data.message) throw new Error(e.response.data.message);
      if (e.message) throw new Error(e.message);
      throw new Error(' user could not be created');
    }
  }

  deleteUserById = async (id: string): Promise<ILoggedInUser[]> => {
    try {
      return await adminBaseAxios.delete<{ users: ILoggedInUser[] }>(`/user/${id}`).then((response) => {
        return response.data.users;
      })
    }
    catch (e: any) {
      if (e.response.data.message) throw new Error(e.response.data.message);
      if (e.message) throw new Error(e.message);
      throw new Error('user could not be created');
    }
  }
}
