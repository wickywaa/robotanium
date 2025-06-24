import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { IBot, ICreateBotDTo } from "../../../models/Bots/bots";
import { BotService } from "../../../services/botServices";
import { addMessage } from "../../slices";
import { createBotFailure, fetchBotsFailure, fetchBotsSuccess, fetchBotsttempt } from "../../slices/botSlice";

const newBotService = new BotService();

export function* createBot(action: PayloadAction<ICreateBotDTo>) {

  try {
    const botResponse:AxiosResponse = yield  newBotService.createBot(action.payload);
    if (botResponse.status !== 201) {
      yield put(createBotFailure())
      yield (addMessage({
        message:'failed to create bot',
        severity: 'error'
      }))
    }

    yield put (addMessage ({
      message:'bot created', 
      severity: 'success'
    }))

    yield put(fetchBotsttempt())

  } catch (e) {
    yield put(createBotFailure())
    yield put (addMessage({
      message: `${e}`,
      severity: 'error'
    }))
  }

}

export function* fetchBots() {
  try {
    const botsResponse: { data: IBot[] } = yield newBotService.fetchBots();

    if (botsResponse?.data.length === 0) {
      yield put(fetchBotsFailure());
      yield put(addMessage({ severity: "warn", message: "no bots to display" }));
    }

    yield put(fetchBotsSuccess(botsResponse?.data));
  } catch (e) {
    yield put(fetchBotsFailure());
    yield put(addMessage({ message: "error fetching bots", severity: "error" }));
  }
}

export function* deleteBots() {
  try {
    const botDeleteResponse:AxiosResponse = yield newBotService.deleteBots();

    console.log("bot delete response", botDeleteResponse )

  }
  catch (e) {

  }
}

export function* botSagas() {
  yield takeEvery("botSlice/createBotAttempt", createBot);
  yield takeEvery("botSlice/fetchBotsttempt", fetchBots);
  yield takeEvery("botSlice/deletebot", deleteBots)
}
