import { put, takeEvery } from "redux-saga/effects";
import { UserManagementService } from "../../../services";
import { ILoggedInUser, UserType } from "../../../models";
import { addUsersFailed, addUsersSuccess, createUserAttempt, createUserFailed, createUserSuccess, addMessage, deleteUserFailed, deleteUserSuccess } from '../../slices';
import { PayloadAction } from "@reduxjs/toolkit";
const userMangementService = new UserManagementService();

function* setallUsers() {

  try {
    const users: ILoggedInUser[] = yield userMangementService.getAllUSers();
    yield put(addUsersSuccess(users))
  } catch (e) {
    yield put(addUsersFailed())
  }
}

function* createUser(action: PayloadAction<{ email: string, userName: string, userType: UserType }>) {

  const { email, userName, userType } = action.payload
  try {
    const userCreated: ILoggedInUser[] | false = yield userMangementService.inviteNewUser({ email, userName, userType });
    //todo no need to have possible false or array  just trip the error if there is a problem
    if (userCreated === false) {
      yield put(createUserFailed());
      yield put(addMessage({ message: `${"user could not be created"}`, severity: 'error' }));
    }

    if (Array.isArray(userCreated)) {
      yield put(createUserSuccess(userCreated));
      yield put(addMessage({ message: `user ${action.payload.userName} created`, severity: 'success' }));
    }
  }
  catch (e) {
    yield put(createUserFailed())
    yield put(addMessage({ message: `${e}`, severity: 'error' }));
  }
}

function* deleteUser(action: PayloadAction<{ id: string, userName: string }>) {
  try {
    const users: ILoggedInUser[] = yield userMangementService.deleteUserById(action.payload.id);
    yield put(deleteUserSuccess(users));
    yield put(addMessage({ message: `user ${action.payload.userName} deleted successfully`, severity: 'success' }));
  }
  catch (e) {
    yield put(deleteUserFailed());
    yield put(addMessage({ message: `${e}`, severity: 'error' }));
  }
}

function* updateUser(action: PayloadAction<ILoggedInUser>) {
  try {
    const users: ILoggedInUser[] = yield userMangementService.updateUser(action.payload._id, action.payload);
    yield put(deleteUserSuccess(users));
    yield put(addMessage({ message: `user ${action.payload.userName} deleted successfully`, severity: 'success' }));
  }
  catch (e) {
    yield put(deleteUserFailed());
    yield put(addMessage({ message: `${e}`, severity: 'error' }));
  }
}

export function* UserManagementAdminSagas() {

  yield takeEvery("userManagementSlice/addUsersAttempt", setallUsers);
  yield takeEvery("userManagementSlice/createUserAttempt", createUser);
  yield takeEvery("userManagementSlice/deleteUserAttempt", deleteUser);
  yield takeEvery("userManagementSlice/updateUserAttempt", updateUser);

}