import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { IConfirmEmailCredentials, ILoggedInUser, ILoginCredentials, IRegisterCredentials } from "../../../models";
import { AuthService, validateisLoginCredentials } from '../../../services/';
import { confirmEmailFailed, confirmEmailSuccess, loginFailed, loginSuccess, logout, registerUserFailed, registerUserSuccess } from '../../slices/';
import { toastSlice } from "../../slices/toastslice";
const authService = new AuthService();

function * loginUser(action: PayloadAction<ILoginCredentials>) {

  try  {
    const isValid = validateisLoginCredentials(action.payload)
    if(!isValid){
      yield toastSlice.actions.addMessage({message:isValid, severity:'error'});
      return;
    } 
    const response: {user:ILoggedInUser, token:string} = yield authService.login({...action.payload});
    localStorage.setItem('authToken',response.token)
    yield put(loginSuccess(response.user));
  }
  catch  {
    yield put(toastSlice.actions.addMessage({message:'Could not login', severity:'error'}));
    yield put(loginFailed());
  }
}

function* registerUserAttempt(action: PayloadAction<IRegisterCredentials>) {
  try{
    const userCreated: boolean = yield authService.registerUser({...action.payload});
    if(!userCreated)  {
      yield put(toastSlice.actions.addMessage({message:'Could not register with those credentials', severity:'error'}));
      yield put(registerUserFailed());
    } 
    yield put(registerUserSuccess())
  }
  catch (e: any) {
  
    yield put(toastSlice.actions.addMessage({message:e.message ?? 'could not register with these credentials', severity:'error'}));
    
    yield put(registerUserFailed())
  }
}

function* confirmEmailSaga(action:PayloadAction<IConfirmEmailCredentials>) {
  try {
    const response:{user:ILoggedInUser, token:string} = yield authService.confirmEmail({...action.payload});
    if(!response)  {
      yield put(toastSlice.actions.addMessage({message:'token invalid or expired', severity:'error'}));
      yield put(confirmEmailFailed());
    }
    localStorage.setItem('authToken',response.token)
    yield put(confirmEmailSuccess(response.user))
  }
  catch(e) {
    yield put(toastSlice.actions.addMessage({message:'token invalid or expired', severity:'error'}));
    yield put(confirmEmailFailed());
  }
}

function* logoutSaga() {
  try {
     yield authService.logout().then((response)=>{
      if(response.status === 200) {
        localStorage.setItem('authToken','')
        return
      }
     });
     
     yield put(logout())
  }
  catch(e) {
    localStorage.setItem('authToken','')
    put(logout())
  }
}

export  function* authSagas() {
  yield takeEvery("authSlice/requestLogin", loginUser);
  yield takeEvery("authSlice/logoutAttempt", logoutSaga);
  yield takeEvery("authSlice/registerUserAttempt", registerUserAttempt)
  yield takeEvery("authSlice/confirmEmailAttempt",confirmEmailSaga)
}