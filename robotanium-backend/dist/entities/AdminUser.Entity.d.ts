import { IAdminUser, IAdminUserRoles } from "../interfaces";
export declare class AdminUserEntity implements IAdminUser {
    uid: string;
    email: string;
    role: IAdminUserRoles;
    firstName: string;
    lastName: string;
    password: string;
    isActive: boolean;
    tokens: string[];
    created_at: string;
    updated_at: string;
}
