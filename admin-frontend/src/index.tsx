import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes";

import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import 'primereact/resources/primereact.css';
import "primeicons/primeicons.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
       <Provider store={store}>
       <PrimeReactProvider>
              <AppRouter />
       </PrimeReactProvider>
       </Provider>

);



// logout endpoint  not working 
// logs out on refresh
//