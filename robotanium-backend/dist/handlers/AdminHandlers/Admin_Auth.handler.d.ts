import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AdminLoginDTO } from "../../interfaces/admin";
export declare const handleAdminLogin: (req: Request<ParamsDictionary, object, AdminLoginDTO>, res: Response) => Promise<void>;
