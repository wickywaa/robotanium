import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICreateTankBot, ITankBot, EmptyCreateTankBot } from "../../Models/Bots";

export interface IBotzReducer {
  createTankBot: ICreateTankBot;
  tankBotzArray: ITankBot[];
  loading: boolean;
}

export const IBotzReducerInitialState: IBotzReducer = {
  createTankBot: EmptyCreateTankBot,
  tankBotzArray: [],
  loading: false,
};

export const BotzSlice = createSlice({
  name: "botzSlice",
  initialState: IBotzReducerInitialState,
  reducers: {
    setCreateTankBot: (state, action: PayloadAction<ICreateTankBot>) => {
      state.createTankBot = action.payload;
    },
    setTankBotzArray: (state, action: PayloadAction<ITankBot[]>) => {
      state.tankBotzArray = action.payload;
    },
    saveTankBot: (state, action: PayloadAction<ICreateTankBot>) => {
      state.loading = true;
    },
    saveTankBotSuccessful: (state) => {
      state.createTankBot = EmptyCreateTankBot;
    },
    saveTankBotUnsuccessful: (state) => {
      state.createTankBot = EmptyCreateTankBot;
    },
  },
});

export const { setCreateTankBot, setTankBotzArray, saveTankBot, saveTankBotSuccessful, saveTankBotUnsuccessful } =
  BotzSlice.actions;
