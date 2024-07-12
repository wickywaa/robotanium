import { put, takeEvery,call,select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IDataBaseGame, IGame, bookableDates, saveGameDTO } from "../../../Models";
import { getBookableDates, getGamesList } from "../../../services";
import { setBookableDates, setSuccessMessage,setErrorMessage,getGamesSuccess,getGames } from "../../Reducers";
import { saveNewGameFailed, saveNewGameSuccess} from '../../Reducers/gamesReducer';
import {saveNewGametoDataBase} from '../../../firebase/AdminFirebaseWriters'
import { RootState } from "../../store";

function* fetchBookableSlots(startDate:Date,endDate?:Date)  {
  try {
   const bookableDates: bookableDates[] = getBookableDates(startDate,endDate) 
   yield put( setBookableDates(bookableDates))
  } catch(e) {
  
  }
}

function* saveGame(action:PayloadAction<IDataBaseGame>) {
  try {
    yield call(()=> saveNewGametoDataBase(action.payload))
    yield put(setSuccessMessage('Game Saved'))
  } 
  catch (e) {
    yield put (saveNewGameFailed())
    yield put (setErrorMessage(`${e}`));
  }
}

function* fetchGamesWithNewfilters() {
  const state:RootState = yield select();
  console.log(state.games.fromDate)
  yield put(getGames({fromDate:new Date(state.games.fromDate), toDate: new Date(state.games.toDate)}));
}

function* validateFields(action: PayloadAction<IGame>) {

}

export function* gamesSagas() {
  yield takeEvery("gameSlice/requestBookableDates", fetchBookableSlots);
  yield takeEvery("gameSlice/saveNewGame",saveGame);
  yield takeEvery(["gameSlice/setFromDate","gameSlice/setToDate"],fetchGamesWithNewfilters)
}
