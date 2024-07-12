import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AdminLoginDTO } from "../../interfaces/admin";

export const handleAdminLogin = async (req: Request<ParamsDictionary, object, AdminLoginDTO>, res: Response): Promise<void> => {

  res.status(200);
};
