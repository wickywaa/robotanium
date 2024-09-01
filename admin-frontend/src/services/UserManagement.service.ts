import { ILoggedInUser } from "../models/User";
import { adminBaseAxios } from "./Base.service";

export class UserManagementService {
  getAllUSers = async (): Promise<ILoggedInUser[]> => {
    try {
      const users = await adminBaseAxios.get<{users:ILoggedInUser[]}>("users").then((response)=>{
        return response.data.users
      });

      if (!users) throw new Error("users could not be loaded");
      console.log(users)

      return users;
    } catch (e) {
      throw new Error("useers could not be loaded");
    }
  };

  getAllAdminUsers = async (): Promise<ILoggedInUser[]> => {
    try {
      const users = await adminBaseAxios.get<{adminUsers:ILoggedInUser[]}>("users/admin").then((response)=>{
        console.log(response)
        return response.data.adminUsers
      });

      if (!users) throw new Error("users could not be loaded");
      console.log(users)

      return users;
    } catch (e) {
      throw new Error("users could not be loaded");
    }
  };
}
