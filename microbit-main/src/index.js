import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
// import "normalize.css";
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
// import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/microbit-main">
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
