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
    }),
    createBotSuccess: (state) =>({
      ...state,
      loading: false
    }),
    createBotFailure: (state)=> ({
      ...state,
      loading: false
    }),
    fetchBotsttempt: (state,action:PayloadAction) =>({
      ...state,
      loading:true
    }),
    fetchBotsSuccess: (state, action:PayloadAction<IBot[]>) => ({
      ...state, 
      loading:false,
      bots: action.payload
    }),
    fetchBotsFailure: (state, action:PayloadAction) =>({
      ...state,
      loading:false,
      bots:[]
    }),
    deleteBotByIdAttempt: (state, action:PayloadAction<string>) =>({
      ...state,
      loading: true,
    }),
    deleteBotSuccess: ( state) =>({
      ...state, 
      loading: false
    }),
    deleteBotFalure: (state) =>({
      ...state,
      loading:false
    })

  }
})

export const {
  createBotAttempt,
  fetchBotsFailure,
  fetchBotsSuccess,
  fetchBotsttempt,
  createBotFailure,
  createBotSuccess,
  deleteBotByIdAttempt,
  deleteBotFalure,
  deleteBotSuccess
} = BotSlice.actions