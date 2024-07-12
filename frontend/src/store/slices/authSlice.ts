import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ILoggedInUser } from "../../models";
import { IConfirmEmailCredentials, ILoginCredentials, IRegisterCredentials } from "../../models/auth";

interface IUserReducer {
  user: ILoggedInUser | null;
  loading: boolean;
  registerEmailSent: boolean;
}

const initialState: IUserReducer = {
  user: null,
  loading: false,
  registerEmailSent: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    requestLogin: (state, _: PayloadAction<ILoginCredentials>) => ({ ...state, loading: true, user: null }),
    loginFailed: (state) => ({ ...state, loading: false, user: null }),
    loginEmailUnverified: (state) => ({ ...state, loading: false, user: null, registerEmailSent:true }),
    loginSuccess: (state, action: PayloadAction<ILoggedInUser>) => ({ ...state, loading: false, user: action.payload }),
    registerUserAttempt: (state, action:PayloadAction<IRegisterCredentials>) => ({...initialState, loading:true}),
    registerUserSuccess: (state ) => ({...state, registerEmailSent:true,loading:false }),
    registerUserFailed: (state) => (initialState),
    confirmEmailAttempt: (state, _: PayloadAction<IConfirmEmailCredentials>) => ({ ...state, loading: true, user: null }),
    confirmEmailSuccess: (state, action: PayloadAction<ILoggedInUser>) => ({ ...state, loading: true, user: action.payload }),
    confirmEmailFailed: (state) => (initialState),
    logoutAttempt: (state,) => ({ ...state, loading: true}),
    logout: (state,) => ({ ...state, loading: false, user: null }),
  },
});

export const { 
  requestLogin, 
  loginFailed, 
  loginSuccess, 
  logoutAttempt,
  logout,
  registerUserAttempt, 
  registerUserFailed, 
  registerUserSuccess, 
  confirmEmailAttempt,
  confirmEmailFailed,
  confirmEmailSuccess
} = authSlice.actions;
