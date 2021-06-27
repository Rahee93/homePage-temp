/**
 * This ErrorNoPage.js catch error for unsupported routes
 */

import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./ErrorNoPage.scss";

export const ErrorNoPage = () => {
  return (
    <div className="error-boundary-nopage vh-100">
      <div className="wrapper p-5 w-100 h-80 d-flex flex-column justify-content-center align-items-center ">
        {/* <div className="wrapper"> */}
        <div className="image mb-5" />
        <h2 className="title mb-4">Sorry! This Page is Buried in the Sand</h2>
        <div className="description">
          <p>
            Hi there! You just entered an invalid route on our website.
            <br />
            We've tried to hide it so that no one could find out!
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/">
              <Button variant="contained" color="primary" size="medium">
                Home Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorNoPage;
