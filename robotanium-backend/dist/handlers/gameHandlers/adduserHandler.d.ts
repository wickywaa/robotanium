import { NextFunction, Response } from "express";
import { AddUserRequest } from "../../interfaces/userInterfaces";
export declare const addUserHandler: (req: AddUserRequest, res: Response, next: NextFunction) => void;
