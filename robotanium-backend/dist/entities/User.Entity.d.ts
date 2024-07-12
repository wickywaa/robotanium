import { IUser, IUserRank } from '../interfaces';
export declare class UserEntity implements IUser {
    uid: string;
    email: string;
    confirmedEmail: string;
    userName: string;
    password: string;
    rank: IUserRank;
    tokens: string[];
    created_at: string;
    updated_at: string;
}
