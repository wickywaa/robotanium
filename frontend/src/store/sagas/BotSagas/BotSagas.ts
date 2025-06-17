import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, takeEvery  } from 'redux-saga/effects'
import { IBot, ICreateBotDTo } from "../../../models/Bots/bots";
import { BotService } from '../../../services/botServices';

const newBotService = new BotService()

export function * createBot(action:PayloadAction<ICreateBotDTo> ) {
  const botResponse:void =  yield newBotService.createBot(action.payload)
  yield console.log('creating bot', createBot)
}

export function * botSagas () {
  yield takeEvery("botSlice/createBotAttempt", createBot)
}