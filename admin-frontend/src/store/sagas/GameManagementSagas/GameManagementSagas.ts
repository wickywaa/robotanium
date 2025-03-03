import { PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "../../../models";
import { takeEvery } from "redux-saga/effects";

function* CreateGame(action: PayloadAction<IGame>) {
  try {
    console.log('creating game in saga', action.payload)

  }
  catch (e) {
    console.log('creating game failed')
  }
}

export function* GameManagementSagas() {

  yield takeEvery("gameSlice/createGameAttempt", CreateGame);

}