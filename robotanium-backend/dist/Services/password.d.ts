export declare class PasswordService {
    encryptPassword: (password: string) => Promise<string>;
    comparePasswords: (password: string, encryptedPassword: string) => Promise<boolean>;
}
