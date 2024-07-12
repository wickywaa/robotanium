import { RootState } from "../../store";

export const createGameState = (state: RootState) => state.games.creatGame;
export const bookableDatesState = (state: RootState) => state.games.bookableDates;
export const isGameLoading = (state:RootState) => state.games.loading;
export const gameErrorsSelector = (state: RootState) => state.games.errors;
export const gameStateSelector =(state:RootState) => state.games;
