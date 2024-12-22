import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { IBot, ICreateBotDTo } from '../../../models/Bots';
import { BotsService } from '../../../services/Bots.service';
import { addMessage, addUsersFailed, createBotFailed, createBotSuccess } from '../../slices';
const botsService = new BotsService()

export function * CreateBot( action: PayloadAction<ICreateBotDTo>) {

  console.log('here is the create bot dto', action.payload)

  try {
    const response:{bots:IBot[]} = yield botsService.createBot(action.payload);
    console.log(response.bots)
    if(!response.bots)throw new Error('bot created but bot list could not be returned')
    yield  put(createBotSuccess(response.bots));
  }
  catch(e) {
    yield put(createBotFailed());
    yield put(addMessage({ message: `${e}`, severity: 'error' }));
  }

}

export function* BotManagementagas() {

  yield takeEvery("botSlice/createBotAttempt", CreateBot);

}