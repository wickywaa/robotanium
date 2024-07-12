import { Response } from "express";
import { createTankBotRequest } from "../../interfaces";
export declare const createBotHandler: (req: createTankBotRequest, res: Response) => Promise<void | Response<any, Record<string, any>>>;
