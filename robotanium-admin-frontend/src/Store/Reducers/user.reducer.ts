import { createSlice } from "@reduxjs/toolkit";
import { IFirebaseUser, IUserCredentials} from "../../Models";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserReducer {
  user: IFirebaseUser | null;
  loading: boolean;
}

const initialState: IUserReducer = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUserCredentials>) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<IFirebaseUser>) => {
      state.user = action.payload;
    },
    signInFailed: (state) => {
      state = initialState;
    },
    signOutUser: (state) => {state = initialState},
    signOutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { signIn, signOutUser, signInSuccess, signInFailed, signOutSuccess } = userSlice.actions;
