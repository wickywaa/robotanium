import { takeEvery, call, select, putResolve, put } from "redux-saga/effects";
import { setCredentials, botSessionRemove } from "../../../Store/Reducers";
import { getSessionAndAccessToken } from "../../../services/";
import { openTokCredentials } from "../../../Models";
import { RootState } from "../../store";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSessionCredentials({ payload }: PayloadAction<{ botId: string, sessionId:string }>) {
  try {
    const state: RootState = yield select();
    if (!state.user.user) throw new Error("unauthorized");
    const { idToken, email, uid } = state.user.user;
    const credentials: openTokCredentials = yield getSessionAndAccessToken({
      botId: payload.botId,
      idToken,
      email: email ?? "",
      uid,
      sessionId: payload.sessionId
    });
    yield put(setCredentials(credentials));
  } catch (e) {
    yield put(botSessionRemove());
  }
}

export function* sessionSaga() {
  yield takeEvery("tankBotSessionSlice/fetchCredentialsAttempt", fetchSessionCredentials);
}
