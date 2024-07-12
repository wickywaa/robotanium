import { Request } from 'express';
import { ICreateTankBot } from '../../interfaces/botinterfaces/botInterfaces';
export interface createAccessTokenRequest extends Request {
    body: {
        botId: string;
        startTime: number;
        endTime: number;
        gameId: string;
        id: string;
        idToken: string;
    };
    sessionId: string;
}
export interface createTankBotRequest extends Request {
    body: ICreateTankBot;
    sessionId: string;
}
