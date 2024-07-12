import { Response } from "express";
import { CreateGameRequest } from "../../interfaces";
export declare const createGameHandler: (req: CreateGameRequest, res: Response) => Response<any, Record<string, any>>;
