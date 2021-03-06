/**
 * This App.js file contains routing set up for different pages in website.
 */

import React from "react";
import { Route, Switch } from "react-router-dom";

import { GlobalStyle } from "./GlobalStyles";
import HomePage from "./pages/home-page/HomePage";
// import ErrorCancelButton from "./pages/error-page/ErrorCancelButton";
// import ErrorPageServer from "./pages/error-page/ErrorPageServer";
import ErrorNoPage from "./pages/error-page/ErrorNoPage";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        {/* <Route exact path="/contact-us" component={ContactUsPage} />
        <Route exact path="/404/cancel" component={ErrorCancelButton} />
        <Route exact path="/404/server" component={ErrorPageServer} /> */}
        <Route exact path="/*" component={ErrorNoPage} />
      </Switch>
    </div>
  );
};

export default App;
