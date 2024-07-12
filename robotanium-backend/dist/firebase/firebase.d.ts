import firebaseAdmin from "firebase-admin";
import { ICreateTankBot } from "../interfaces/botinterfaces";
export declare const fireStoreDB: firebaseAdmin.firestore.Firestore;
export declare const auth: import("firebase-admin/lib/auth/auth").Auth;
export declare const getBotById: (botId: string) => Promise<ICreateTankBot>;
export declare const getBotPasswordById: (botId: string) => Promise<string>;
export declare const setBotStatus: (botId: string, status: boolean) => void;
