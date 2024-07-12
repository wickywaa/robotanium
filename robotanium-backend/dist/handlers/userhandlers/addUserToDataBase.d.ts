import { NextFunction, Response } from "express";
import { AddUserToDataBaseRequest } from "../../interfaces/";
export declare const addDbUserHandler: (req: AddUserToDataBaseRequest, res: Response, next: NextFunction) => void;
