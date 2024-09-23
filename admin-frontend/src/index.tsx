import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes";

import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthService } from "./services";
import { loginSuccess } from "./store/slices";
const user = store.getState().auth.user;
const authToken = localStorage.getItem("authToken");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const renderApp = () => {
  return root.render(
    <Provider store={store}>
      <PrimeReactProvider>
        <AppRouter />
      </PrimeReactProvider>
    </Provider>
  );
};

if (user) {
  renderApp();
} else {
  if (authToken?.length) {
    new AuthService().loginWithToken().then((response) => {
      if (response) {
        localStorage.setItem("authToken", response.token);
        store.dispatch(loginSuccess(response.user));
        return renderApp();
      }
      return renderApp();
    });
  } else {
    renderApp();
  }
}
