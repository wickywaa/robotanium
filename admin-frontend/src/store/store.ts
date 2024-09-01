import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices";
import createSagaMiddleware from "redux-saga";
import { authSagas, UserManagementAdminSagas, UserManagementUserSagas } from "./sagas";
import { toastSlice, userManagementSlice } from "./slices";
import validator from "validator";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toastSlice: toastSlice.reducer,
    userManagementSlice:  userManagementSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSagas)
sagaMiddleware.run(UserManagementUserSagas)
sagaMiddleware.run(UserManagementAdminSagas)

/* sagaMiddleware.run(signInUserSaga);
sagaMiddleware.run(gamesSagas);
sagaMiddleware.run(botzSagas);
sagaMiddleware.run(sessionSaga); */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
