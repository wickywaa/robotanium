import { stat } from "fs";
import { RootState } from "../../store";

export const  selectCreateBot =  (state: RootState) => state.botz.createTankBot;
export const  botzList = (state: RootState) => state.botz.tankBotzArray;
