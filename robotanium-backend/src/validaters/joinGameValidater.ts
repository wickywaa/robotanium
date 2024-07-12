import { NextFunction, Request, Response } from "express";
import { RequestBotId } from "../interfaces/userInterfaces";

const userAuth = (req: RequestBotId, res: Response, next: NextFunction) => {
  next();
};
