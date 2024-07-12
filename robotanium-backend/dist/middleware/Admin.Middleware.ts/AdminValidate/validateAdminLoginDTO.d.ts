import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { AdminLoginDTO } from '../../../interfaces';
export declare const validateAdminLoginDtoMiddleware: (req: Request<ParamsDictionary, object, AdminLoginDTO>, res: Response, next: NextFunction) => Promise<Response | undefined>;
