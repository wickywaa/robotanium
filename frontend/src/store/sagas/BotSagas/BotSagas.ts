import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, takeEvery  } from 'redux-saga/effects'
import { IBot, ICreateBotDTo } from "../../../models/Bots/bots";
import { BotService } from '../../../services/botServices';

const newBotService = new BotService()

export function* createBot(action:PayloadAction<ICreateBotDTo> ) {
  const botResponse:void =  yield newBotService.createBot(action.payload)
  yield console.log('creating bot', createBot)
}

export function* fetchBots() {

  console.log('triggered')
  const botsResponse:IBot[] = yield newBotService.fetchBots()

  console.log('here is thte new bot list', botsResponse);
}

export function* botSagas () {
  yield takeEvery("botSlice/createBotAttempt", createBot)
  yield takeEvery("botSlice/fetchBotsttempt", fetchBots)
}