import { RootState } from "../store";

export const selectCreateBot =  (state: RootState) => state.botSlice.createBot;
export const selectShowCreateBot = (state:RootState) => state.botSlice.showCreateBot;