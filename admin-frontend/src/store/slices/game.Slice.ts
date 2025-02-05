import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyGame, IBot, IConnectedBot, ICreateBotDTo, ICreateGameDto, IGame } from '../../models';

export interface IGamesReducer {
  createGame: {
    game: IGame
    image: string | null;
    name: string;
  },
  games: IGame[],
  showCreateGameModal: boolean;
  isLoading: boolean;
  onlineBots: IConnectedBot[]
}

 export const initialGameState: IGamesReducer = {
  createGame: {
    game: emptyGame,
    image: '',
    name: '',
  },
  games: [],
  showCreateGameModal: false,
  isLoading: false,
  onlineBots: []
};

export const GameSlice = createSlice({
  name: "gameSlice",
  initialState: initialGameState,
  reducers: {
    setShowCreateGameModal: (state, action:PayloadAction<boolean>) => ({ ...state, showCreateGameModal: action.payload }),
    createGameAttempt: (state, action: PayloadAction<ICreateGameDto>) => ({ ...state, isLoading: true }),
    createGameFailed: (state) => ({...state, isLoading: false }),
    createGameSuccess: (state, action: PayloadAction<IGame[]>) => ({ ...state, games: action.payload, showCreateGame:false, isLoading:false }),
    updateCreateGame: (state, action:PayloadAction<IGame>) => ({...state,createGame:{...state.createGame,game:action.payload} , showCreateGameModal:false})
  }
})

export const {
  setShowCreateGameModal,
  createGameAttempt,
  createGameFailed,
  createGameSuccess,
  updateCreateGame,
} = GameSlice.actions

