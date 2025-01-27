import { RootState } from "../store";

export const selectCreateGame =  (state: RootState) => state.gameSlice.showCreateGameModal
export const selectShowCreateGame = (state:RootState) => state
export const selectGames = (state: RootState) => state