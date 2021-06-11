/**
 * This App.js file contains routing set up for different pages in website.
 */

import React from "react";
import { Route, Switch } from "react-router-dom";

import { GlobalStyle } from "./GlobalStyles";
import MapPage from "./pages/map-page/MapPage";
import HomePage from "./pages/home-page/HomePage";
import ContactUsPage from "./pages/contact-us-page/ContactUsPage";
import GalleryPage from "./pages/gallery-page/GalleryPage";
import GetStartedPage from "./pages/get-started-page/GetStartedPage";
import MicrobitSyncPage from "./pages/mircobit-sync-page/MicrobitSyncPage";
import ErrorCancelButton from "./pages/error-page/ErrorCancelButton";
import ErrorPageServer from "./pages/error-page/ErrorPageServer";
import ErrorNoPage from "./pages/error-page/ErrorNoPage";
import ErrorPage from "./pages/error-page/ErrorPage";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/get-started" component={GetStartedPage} />
        <Route exact path="/microbit-sync" component={MicrobitSyncPage} />
        <Route exact path="/gallery" component={GalleryPage} />
        <Route exact path="/contact-us" component={ContactUsPage} />
        <Route exact path="/404/cancel" component={ErrorCancelButton} />
        <Route exact path="/404/server" component={ErrorPageServer} />
        <Route exact path="/404/errorpage" component={ErrorPage} />
        <Route exact path="/*" component={ErrorNoPage} />
      </Switch>
    </div>
  );
};

export default App;
