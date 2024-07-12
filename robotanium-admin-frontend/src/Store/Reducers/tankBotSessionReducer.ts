import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openTokCredentials } from "../../Models";

export interface ITankBotInitialState {
  botId: string;
  accessToken: string;
  sessionId: string;
  loading: boolean;
}
export const tankBotSessionInitialState = {
  botId: "",
  accessToken: "",
  sessionId: "",
  loading: false,
};

export const tankBotSessionSlice = createSlice({
  name: "tankBotSessionSlice",
  initialState: tankBotSessionInitialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    fetchCredentialsAttempt: (state, action: PayloadAction<{ botId: string; sessionId: string }>) => {
      state.loading = true;
    },
    setCredentials: (state, { payload }: PayloadAction<openTokCredentials>) => {
      state.accessToken = payload.accessToken;
      state.sessionId = payload.sessionId;
      state.loading = false;
    },
    setBotId: (state, action: PayloadAction<string>) => {
      state.botId = action.payload;
    },
    botSessionRemove: (state) => {
      state = tankBotSessionInitialState;
    },
  },
});

export const { fetchCredentialsAttempt, setCredentials, setBotId, botSessionRemove } = tankBotSessionSlice.actions;
