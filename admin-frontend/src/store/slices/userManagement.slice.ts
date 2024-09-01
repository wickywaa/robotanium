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
    addUsersAttempt: (state ) => ({...state, isLoading: true}),
    addUsersFailed: (state ) => ({...state, users: [], loading: false }),
    addUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, users: action.payload}),
    addAdminUsersAttempt: (state ) => ({...state, isLoading: true}),
    addAdminUsersFailed: (state ) => ({...state, adminUsers: [], loading: false }),
    addAdminUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, adminUsers: action.payload}),
  }

})

export  const { 
  addAdminUsersAttempt, 
  addAdminUsersFailed,
  addAdminUsersSuccess,
  addUsersAttempt, 
  addUsersFailed, 
  addUsersSuccess
} = userManagementSlice.actions

