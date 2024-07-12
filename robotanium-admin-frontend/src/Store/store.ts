import { configureStore } from "@reduxjs/toolkit";
import { userSlice, gameSlice, toastSlice, BotzSlice, tankBotSessionSlice } from "./Reducers";
import createSagaMiddleware from "redux-saga";
import { signInUserSaga, gamesSagas, botzSagas, sessionSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    games: gameSlice.reducer,
    toast: toastSlice.reducer,
    botz: BotzSlice.reducer,
    tankBotSession: tankBotSessionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(signInUserSaga);
sagaMiddleware.run(gamesSagas);
sagaMiddleware.run(botzSagas);
sagaMiddleware.run(sessionSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
