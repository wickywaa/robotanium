import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBot, ICreateBotDTo } from '../../models';


export interface IBotReducer {
  createBot: {
    image: string | null;
    name: string;
  },
  bots: IBot[],
  showCreateBot: boolean;
  isLoading: boolean;
}

 
export const initialState: IBotReducer = {
  createBot: {
    image: '',
    name: ''
  },
  bots: [],
  showCreateBot:false,
  isLoading:false,
};


export const BotSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    setCreateBotName: (state,action: PayloadAction<string>) => ({ ...state, createBot: {...state.createBot,name:action.payload} }),
    setCreateBotImage: (state, action: PayloadAction<string>) => ({ ...state, createBot: {...state.createBot,name:action.payload} }),
    setShowCreateBot: (state, action: PayloadAction<boolean>) => ({ ...state, showCreateBot:action.payload }),
    createBotAttempt: (state, action: PayloadAction<ICreateBotDTo>) => ({ ...state, isLoading: true }),
    createBotFailed: (state) => ({...state, isLoading: false }),
    createBotSuccess: (state, action: PayloadAction<IBot[]>) => ({ ...state, bots: action.payload, showCreateBot:false, isLoading:false }),
  }
})

export const {
  setCreateBotImage,
  setCreateBotName,
  setShowCreateBot,
  createBotAttempt,
  createBotFailed,
  createBotSuccess
} = BotSlice.actions

