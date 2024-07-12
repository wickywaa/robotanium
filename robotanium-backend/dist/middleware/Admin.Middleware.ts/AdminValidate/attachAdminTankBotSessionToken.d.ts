import { Response, NextFunction } from 'express';
import { IconnectBot } from '../../../interfaces';
export declare const attachAdminTankBotSessionToken: (req: IconnectBot, res: Response, next: NextFunction) => Promise<void>;
