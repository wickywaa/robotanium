import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, takeEvery  } from 'redux-saga/effects'
import { IBot, ICreateBotDTo } from "../../../models/Bots/bots";
import { BotService } from '../../../services/botServices';
import { fetchBotsFailure, fetchBotsSuccess } from '../../slices/botSlice';
import { addMessage } from '../../slices';

const newBotService = new BotService()

export function* createBot(action:PayloadAction<ICreateBotDTo> ) {
  const botResponse:void =  yield newBotService.createBot(action.payload)
  yield console.log('creating bot', createBot)
}

export function* fetchBots() {

  try {
    const botsResponse:{data:IBot[]} = yield newBotService.fetchBots()

    if(botsResponse?.data.length === 0) {
     yield put(fetchBotsFailure())
     yield put(addMessage({severity:'warn', message:'no bots to display'}))
    }

    yield put(fetchBotsSuccess(botsResponse?.data))

  } catch (e) {
     yield put(fetchBotsFailure())
     yield put(addMessage({message:'error fetching bots', severity:'error'}))
  }
  
  
  

}

export function* botSagas () {
  yield takeEvery("botSlice/createBotAttempt", createBot)
  yield takeEvery("botSlice/fetchBotsttempt", fetchBots)
}