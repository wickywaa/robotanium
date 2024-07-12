import { createSlice } from "@reduxjs/toolkit";
import { IGame, assignPlayerAction, bookableDates, emptyGame, saveGameDTO,gameFields, IDataBaseGame } from "../../Models";
import type { PayloadAction } from "@reduxjs/toolkit";
import {todaysDate,lastWeeksDate} from './../../Models/DateAndTime';

export interface IGamesReducer {
  games: IDataBaseGame[];
  creatGame: IGame;
  bookableDates: bookableDates[];
  errors: gameFields[];
  loading: boolean;
  fromDate: number;
  toDate: number;
}

const initialState: IGamesReducer = {
  games: [],
  creatGame: emptyGame,
  bookableDates: [],
  errors: ['Map'],
  loading: false,
  fromDate: new Date(lastWeeksDate).getTime(),
  toDate: new Date(todaysDate).getTime(),
};

export const gameSlice = createSlice({
  name: "gameSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<IDataBaseGame[]>) => {
      state.games = action.payload
    },
    getGames: (state, action: PayloadAction<{fromDate:Date,toDate:Date}>) => {
      state.loading =true;
    },
    getGamesSuccess:(state,action:PayloadAction<IDataBaseGame[]>) => {
      state.games = action.payload;
      state.loading = false;
    },
    setCreateGame: (state, action: PayloadAction<IGame>) => {
      state.creatGame = action.payload;
    },
    changeNumOfPlayers: (state, action: PayloadAction<number>) => {
      state.creatGame.playersArray = [...new Array(action.payload)].map((player, key) => {
        return {
          playerId: `Player ${key + 1}`,
          botId: "",
          botName: "",
        };
      });
      state.creatGame.numberOfPlayers = action.payload;
    },
    requestBookableDates: (state, action: PayloadAction<{ startDate: Date; endDate?: Date }>) => {
      state.bookableDates = [];
    },
    setBookableDates: (state, action: PayloadAction<bookableDates[]>) => {
      state.bookableDates = action.payload;
    },
    assignBotToPlayer: (state, action: PayloadAction<assignPlayerAction>) => {
      state.creatGame.playersArray = state.creatGame.playersArray.map((player) => {
        if (player.playerId === action.payload.player.playerId) {
          return {
            ...player,
            botId: action.payload.botId,
            botName: action.payload.botName,
          };
        }
        return player;
      });
    },
    saveNewGame: (state, action: PayloadAction<IGame>) => {
      state.loading = true;
    },
    saveNewGameSuccess: (state) => {
      return {
        ...initialState,
      };
    },
    saveNewGameFailed: (state) => {
      state.loading = false;
    },
    setErrors: (state, action: PayloadAction<gameFields[]>) => {
      state.errors = action.payload;
    },
    setFromDate: (state,action:PayloadAction<{fromDate:Date}>) =>{
      state.fromDate = action.payload.fromDate.getTime()
    },
    setToDate: (state,action:PayloadAction<{toDate:Date}>) => {
      state.toDate = action.payload.toDate.getTime();
    }
  },
});

export const {
  getGames,
  getGamesSuccess,
  setCreateGame,
  changeNumOfPlayers,
  assignBotToPlayer,
  setBookableDates,
  requestBookableDates,
  saveNewGame,
  saveNewGameFailed,
  saveNewGameSuccess,
  setErrors,
  setFromDate,
  setToDate,
  setGames
} = gameSlice.actions;
