import { put, takeEvery } from "redux-saga/effects";
import { UserManagementService } from "../../../services";
import { ILoggedInUser } from "../../../models";
import { addUsersFailed, addAdminUsersSuccess, addAdminUsersFailed,createAdminUserAttempt,createAdminUserFailed,createAdminUserSuccess, addMessage, deleteAdminUserFailed, deleteAdminUserSuccess } from '../../slices';
import { PayloadAction } from "@reduxjs/toolkit";
const userMangementService  = new UserManagementService();

function * setallAdminUsers() {

  try {
    const users: ILoggedInUser[]  = yield userMangementService.getAllAdminUsers(); 
    yield put(addAdminUsersSuccess(users) )
  } catch (e) {
    yield put( addAdminUsersFailed())
  }
}

function * createAdminUser(action:PayloadAction<{email: string, userName:string}>) {
  try {
    const userCreated: ILoggedInUser[] | false  = yield  userMangementService.inviteNewUserAdmin({email:action.payload.email,userName:action.payload.userName});
    console.log('the user had been created',userCreated)

    if(userCreated === false ) {
      yield put(createAdminUserFailed());
      yield put(addMessage({message:`${"user could not be created"}`,severity:'error'}));
    }

    if(Array.isArray(userCreated)) {
      yield put(createAdminUserSuccess(userCreated));
      yield put(addMessage({message:`user ${action.payload.userName} created`,severity:'success'}));
    }
    
  }
  catch (e) {
    console.log(e)
    yield put(createAdminUserFailed())
    yield put(addMessage({message:`${e}`,severity:'error'}));
  }
}

function * deleteAdminUser (action:PayloadAction<{id:string, userName:string}>) {
  try {
    const users: ILoggedInUser[] = yield userMangementService.deleteUserById(action.payload.id);
    yield put(deleteAdminUserSuccess(users));
    yield put(addMessage({message:`user ${action.payload.userName} deleted successfully`, severity:'success'}));  }
  catch (e) {
    yield put(deleteAdminUserFailed());
    yield put(addMessage({message: `${e}`, severity:'error'}));
  }
}

export function * UserManagementAdminSagas (){

  yield takeEvery("userManagementSlice/addAdminUsersAttempt", setallAdminUsers);
  yield takeEvery("userManagementSlice/createAdminUserAttempt", createAdminUser);
  yield takeEvery("userManagementSlice/deleteAdminUserAttempt", deleteAdminUser);

}