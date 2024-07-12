import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IToastReducer {
    errorMessage: string;
    successMessage: string;
    warnMessage: string;
    infoMessage: string;
  }
  
  const initialState: IToastReducer = {
    errorMessage: '',
    successMessage:'',
    warnMessage: '',
    infoMessage: '',
  };

export const toastSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
      setErrorMessage: (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload
      },
      setSuccessMessage: (state, action: PayloadAction<string>) => {
        state.successMessage = action.payload
      },
      setWarnMessage: (state, action: PayloadAction<string>) => {
        state.successMessage = action.payload
      },
      setInfoMessage: (state, action: PayloadAction<string>) => {
        state.successMessage = action.payload
      },
    },
  });
  
  export const { setErrorMessage, setInfoMessage, setSuccessMessage, setWarnMessage } = toastSlice.actions;
