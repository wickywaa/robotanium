import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes";

import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import 'primereact/resources/primereact.css';
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
console.log(window.location)
root.render(
       <AppRouter />
);

