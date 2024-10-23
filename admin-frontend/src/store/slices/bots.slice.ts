import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IBotReducer {
  createBot: {
    image: string | null;
    name: string;
  }
  showCreateBot: boolean;
}

 
export const initialState: IBotReducer = {
  createBot: {
    image: '',
    name: ''
  },
  showCreateBot:false,
};


export const BotSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    setCreateBotName: (state,action:PayloadAction<string>) => ({ ...state, createBot: {...state.createBot,name:action.payload} }),
    setCreateBotImage: (state, action:PayloadAction<string>) => ({ ...state, createBot: {...state.createBot,name:action.payload} }),
    setShowCreateBot: (state, action:PayloadAction<boolean>) => ({ ...state, showCreateBot:action.payload }),
  }
})

export const {
  setCreateBotImage,
  setCreateBotName,
  setShowCreateBot
} = BotSlice.actions

