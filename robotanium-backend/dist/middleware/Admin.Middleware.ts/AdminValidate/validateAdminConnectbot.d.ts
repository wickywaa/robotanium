import { Response, NextFunction } from 'express';
import { IconnectBot } from '../../../interfaces';
export declare const validateAdminConnectbot: (req: IconnectBot, res: Response, next: NextFunction) => Promise<number>;
