import { put, takeEvery, call, select } from "redux-saga/effects";
import { saveTankBot } from "../../../services";
import { PayloadAction } from "@reduxjs/toolkit";
import { saveTankBotSuccessful, saveTankBotUnsuccessful, setErrorMessage, setSuccessMessage } from "../../Reducers";
import { ICreateTankBot } from "../../../Models/Bots";
import { RootState } from "../../store";
import { userState } from "../../Selectors";

function* createTankBot(action: PayloadAction<ICreateTankBot>) {
  try {
    const state: RootState = yield select();
    yield call(() =>
      saveTankBot({ ...action.payload, idToken: state.user.user?.idToken ?? "", uid: state.user.user?.uid ?? "" }).catch((e) => {
        throw new Error(e.response.data.error);
      })
    );
    yield put(saveTankBotSuccessful());
    yield put(setSuccessMessage("Bot Saved"));
  } catch (error: any) {
    yield put(saveTankBotUnsuccessful());
    yield put(setErrorMessage(`${error ?? ""} Bot Could not be saved`));
  }
}

export function* botzSagas() {
  yield takeEvery("botzSlice/saveTankBot", createTankBot);
}
