import { Connection } from 'mongoose';
import { IError, IErrorModel } from './interfaces';
import { ErrorsSchema } from './errors.schema';

export const errorsProviders = [
  {
    provide: 'ERRORS_MODEL',
    useFactory: (connection: Connection) => connection.model<IError, IErrorModel>('Errors', ErrorsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];