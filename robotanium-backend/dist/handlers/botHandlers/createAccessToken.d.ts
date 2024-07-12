import { NextFunction, Response } from "express";
import { createAccessTokenRequest } from "../../interfaces";
export declare const addBotHandler: (req: createAccessTokenRequest, res: Response, next: NextFunction) => void;
