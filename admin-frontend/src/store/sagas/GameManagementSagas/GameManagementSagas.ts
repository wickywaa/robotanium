import { PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "../../../models";
import { call, put, takeEvery } from "redux-saga/effects";
import { gamesService } from "../../../services/Games.service";
import { createGameFailed, createGameSuccess, deleteGameFailed, deleteGameSuccess, getGamesFailed, getGamesSuccess, setShowCreateGameModal } from "../../slices/game.Slice"


function* CreateGame(action: PayloadAction<IGame>) {
  try {

    const gamesresponse:IGame[] = yield gamesService.createGame(action.payload)
    console.log('gamesresponse', gamesresponse)
    if(gamesresponse.length > 0) {
      yield put(createGameSuccess(gamesresponse))
      yield put(setShowCreateGameModal(false))
    }

    if(gamesresponse.length === 0) {
      yield put(createGameFailed())
    }

  }
  catch (e) {
    yield put(createGameFailed())
  }
}

function* GetGames() {
  try {
    const gamesresponse:IGame[] = yield gamesService.getGames();
    if(gamesresponse.length > 0) {
      yield put(getGamesSuccess(gamesresponse))
    }

    if(gamesresponse.length === 0) {
      yield put(getGamesFailed())
    }
  }
  catch (e) {
    yield put(getGamesFailed())
  }
} 

function* DeleteGame(action: PayloadAction<string>) {
  try {
    const gamesresponse:IGame[] = yield gamesService.deleteGameById(action.payload)
  
    yield put(deleteGameSuccess(gamesresponse))
   
  }
  catch (e) {
    yield put(deleteGameFailed())
  }
}

export function* GameManagementSagas() {
  yield takeEvery("gameSlice/createGameAttempt", CreateGame);
  yield takeEvery("gameSlice/getGamesAttempt", GetGames);
  yield takeEvery("gameSlice/deleteGameAttempt", DeleteGame);
}