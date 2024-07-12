import { Response, NextFunction } from 'express';
import { IconnectBot } from '../../../interfaces';
export declare const validateAdminUser: (req: IconnectBot, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
