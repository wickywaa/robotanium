import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { login, attachIdTokenToUser, signOut } from '../../../firebase/AdminFirebaseListeners/auth'
import { IFirebaseUser, IUserCredentials } from "../../../Models";
import { signInSuccess, signOutSuccess } from "../../Reducers";

function* fetchUser(action: PayloadAction<IUserCredentials>) {
  try {
    const user: IFirebaseUser = yield login(action.payload);
    const idToken: string = yield attachIdTokenToUser();
    const userWithId: IFirebaseUser  = yield {...user, idToken};
    yield put(signInSuccess(userWithId));
  } catch (e) {
    yield put({ type: "userSlice/signInFailed" });
  }
}

function* signOutSaga() {
  try {
    yield signOut();
    yield put(signOutSuccess());
  } catch (e) {
    console.log("cannot signout");
  }
}

export function* signInUserSaga() {
  yield takeEvery("userSlice/signIn", fetchUser);
  yield takeEvery("userSlice/signOutUser", signOutSaga);
}
