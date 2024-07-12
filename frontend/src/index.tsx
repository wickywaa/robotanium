import React from "react";
import {Provider} from 'react-redux';
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes";
import reportWebVitals from "./reportWebVitals";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import 'primereact/resources/primereact.css';
import "primeicons/primeicons.css";
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
      <PrimeReactProvider>
    <AppRouter />
    </PrimeReactProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
