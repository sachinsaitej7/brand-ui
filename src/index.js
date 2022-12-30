import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://a2714fa00e354575bef6664b879ac89d@o4503977086418944.ingest.sentry.io/4504407214391296",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
