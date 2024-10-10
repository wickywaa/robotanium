import type { PayloadAction  } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ILoggedInUser, UserType } from '../../models/User'

interface userManagementState {
  users: ILoggedInUser[];
  loading: boolean;
  showCreateAdminUser: boolean;
  editUser: {user:ILoggedInUser, showResetPassword:boolean}| null ; 
}

const initialState: userManagementState = {
  users: [],
  loading: true,
  showCreateAdminUser: false,
  editUser: null,
}

export const userManagementSlice = createSlice({
  name: "userManagementSlice",
  initialState,
  reducers: {
    setShowCreateUser:(state,action: PayloadAction<boolean>)=>({...state, showCreateAdminUser:action.payload}),
    setEditUser:(state,action: PayloadAction<{user:ILoggedInUser, showResetPassword:boolean}>)=>({...state, editUser:action.payload}),
    addUsersAttempt: (state ) => ({...state, isLoading: true}),
    addUsersFailed: (state ) => ({...state, users: [], loading: false }),
    addUsersSuccess: (state, action: PayloadAction<ILoggedInUser[]>) => ({...state, users: action.payload}),
    createUserAttempt: (state, action: PayloadAction<{email: string, userName:string, userType:UserType}>)=> ({...state, loading: true}),
    createUserFailed: (state)=> ({...state, loading:false}),
    createUserSuccess: (state, action: PayloadAction<ILoggedInUser[]> )=> ({...state, loading: false, users: action.payload, showCreateAdminUser: false}),
    deleteUserAttempt: (state, action: PayloadAction<{id:string, userName:string}>) => ({...state, loading: true}),
    deleteUserFailed: (state ) =>({...state, loading: true}),
    deleteUserSuccess: (state, action:PayloadAction<ILoggedInUser[]>)=>({...state, loading: false, users:action.payload}),
    updateUserAttempt: (state, action:PayloadAction<ILoggedInUser>)=>({...state, loading: true }),
    updateUserFailed: (state, )=>({...state, loading: false }),
    updateUserSuccess: (state, action:PayloadAction<ILoggedInUser[]>)=> ({...state, loading: false, users:action.payload })
  }
})

export  const { 
  setShowCreateUser,
  setEditUser,
  addUsersAttempt, 
  addUsersFailed,
  addUsersSuccess,
  createUserAttempt,
  createUserFailed,
  createUserSuccess,
  deleteUserAttempt,
  deleteUserFailed,
  deleteUserSuccess,
  updateUserAttempt,
  updateUserFailed,
  updateUserSuccess
} = userManagementSlice.actions

