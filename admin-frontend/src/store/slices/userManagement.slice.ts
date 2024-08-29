import type { PayloadAction  } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ILoggedInUser } from '../../models/User'

interface userManagementState {
  users: ILoggedInUser[];
  adminUsers: ILoggedInUser[];
  loading: boolean;
}

const initialState: userManagementState = {
  users: [],
  adminUsers:[],
  loading: true,
}

export const userManagementSlice = createSlice({
  name: "userManagementSlice",
  initialState,
  reducers: {
    addUsersAttempt: (state, _ ) => ({...state, isLoading: true}),
    addUsersFailed: (state, _ ) => ({...state, users: [], loading: false }),
    addUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, users: action.payload}),
    addAdminUsersAttempt: (state, _ ) => ({...state, isLoading: true}),
    addAdminUsersFailed: (state, _ ) => ({...state, adminUsers: [], loading: false }),
    addADminUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, adminUsers: action.payload}),
  }

})

