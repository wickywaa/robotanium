import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFirebaseUser, ILoginCredentials } from "../../models/auth";
import { IToastMessage } from "../../models/toastMessage";

interface IToastReducer {
  toastMessage: IToastMessage;
}

const initialState: IToastReducer = {
  toastMessage: {
    message: '',
    severity: null
  }
};

export const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IToastMessage>) => ({ ...state, loading: true, user: null }),
  },
});

export const { addMessage } = toastSlice.actions;
