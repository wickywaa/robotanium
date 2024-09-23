import type { PayloadAction  } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ILoggedInUser } from '../../models/User'

interface userManagementState {
  users: ILoggedInUser[];
  adminUsers: ILoggedInUser[];
  loading: boolean;
  showCreateAdminUser: boolean;
}

const initialState: userManagementState = {
  users: [],
  adminUsers:[],
  loading: true,
  showCreateAdminUser: false,
}

export const userManagementSlice = createSlice({
  name: "userManagementSlice",
  initialState,
  reducers: {
    setShowCreateAdminuser:(state,action: PayloadAction<boolean>)=>({...state, showCreateAdminUser:action.payload}),
    addUsersAttempt: (state ) => ({...state, isLoading: true}),
    addUsersFailed: (state ) => ({...state, users: [], loading: false }),
    addUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, users: action.payload}),
    addAdminUsersAttempt: (state ) => ({...state, isLoading: true}),
    addAdminUsersFailed: (state ) => ({...state, adminUsers: [], loading: false }),
    addAdminUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, adminUsers: action.payload}),
    createAdminUserAttempt: (state, action: PayloadAction<{email: string, userName:string}>)=> ({...state, loading: true}),
    createAdminUserFailed: (state)=> ({...state, loading:false}),
    createAdminUserSuccess: (state, action: PayloadAction<ILoggedInUser[]> )=> ({...state, loading: false, adminUsers: action.payload, showCreateAdminUser: false}),
    deleteAdminUserAttempt: (state, action: PayloadAction<{id:string, userName:string}>) => ({...state, loading: true}),
    deleteAdminUserFailed: (state ) =>({...state, loading: true}),
    deleteAdminUserSuccess: (state, action:PayloadAction<ILoggedInUser[]>)=>({...state, loading:false, adminUsers:action.payload}),
  }

})

export  const { 
  setShowCreateAdminuser,
  addAdminUsersAttempt, 
  addAdminUsersFailed,
  addAdminUsersSuccess,
  addUsersAttempt, 
  addUsersFailed, 
  addUsersSuccess,
  createAdminUserAttempt,
  createAdminUserFailed,
  createAdminUserSuccess,
  deleteAdminUserAttempt,
  deleteAdminUserFailed,
  deleteAdminUserSuccess
} = userManagementSlice.actions

