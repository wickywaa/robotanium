
import { Connection } from 'mongoose';
import { IGame, IGameMethods } from './interfaces/games.interface';
import { gameSchema } from './games.schema';

export const botsProviders = [
  {
    provide: 'GAME_MODEL',
    useFactory: (connection: Connection) => connection.model<IGame, IGameMethods>('Game', gameSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];