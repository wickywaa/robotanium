import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, takeEvery  } from 'redux-saga/effects'
import { IBot, ICreateBotDTo } from "../../../models/Bots/bots";

export function * createBot(createBot:PayloadAction<ICreateBotDTo> ) {

  yield console.log('creating bot', createBot)

}


export function * botSagas () {
  yield takeEvery("botSlice/createBotAttempt", createBot)
}