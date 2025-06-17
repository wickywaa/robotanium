import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBot, ICreateBotDTo } from "../../models/Bots/bots";

interface IBotSliceInterface {
  loading: boolean;
  bots: IBot [];
}

export const botSliceInitialState: IBotSliceInterface = {
  loading: false,
  bots:[]
}

export const BotSlice = createSlice({
  name:'botSlice',
  initialState: botSliceInitialState,
  reducers: {
    createBotAttempt: (state, action:PayloadAction<ICreateBotDTo> ) => ({
      ...state,
      loading: true,
    }) 
  }
})

export const {
  createBotAttempt
} = BotSlice.actions