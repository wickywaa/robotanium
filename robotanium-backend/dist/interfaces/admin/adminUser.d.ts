export declare class AdminLoginDTO {
    email: string;
    password: string;
}
export declare enum IAdminUserRoles {
    SuperAdmin = "superAdmin",
    Admin = "admin"
}
export interface IAdminUser {
    uid: string;
    email: string;
    role: IAdminUserRoles;
    firstName: string;
    lastName: string;
    password: string;
    isActive: boolean;
    created_at?: string;
    updated_at?: string;
}
