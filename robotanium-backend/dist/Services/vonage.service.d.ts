import { IGeneratetoken } from "../interfaces";
export declare const createSessionId: (callback: (err: Error, token: string) => void) => Promise<any>;
export declare const createSessionToken: (options: IGeneratetoken) => Promise<string>;
