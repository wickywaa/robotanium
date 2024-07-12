import  {NextFunction, Request, Response} from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { AdminLoginDTO } from '../../../interfaces';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateAdminLoginDtoMiddleware = async (
    req : Request<ParamsDictionary, object, AdminLoginDTO>,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {

    const adminLoginDTOInstance = plainToInstance(AdminLoginDTO, req.body);
    const errors = await validate(adminLoginDTOInstance,{whitelist:true,forbidNonWhitelisted:true});

    if(errors.length > 0) {
        return res.status(400).json({error: errors.toString()})
    }

    next()

}
