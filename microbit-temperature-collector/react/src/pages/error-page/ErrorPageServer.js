/**
 * This ErrorPage.js catch error for time-out connection from server
 */

import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./ErrorPageServer.scss";

export const ErrorPage = () => {
  return (
    <div className="error-boundary-server vh-100">
      <div className="wrapper p-5 w-100 h-80 d-flex flex-column justify-content-center align-items-center ">
        {/* <div className="wrapper"> */}
        <div className="image mb-5" />
        <h2 className="title mb-4">Sorry! This Page is Melted in the Sun</h2>
        <div className="description">
          <p>
            Our server has been waiting for too long. There is something wrong
            with the connection. Please reconnect microbit to computer.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/microbit-sync">
              <Button variant="contained" color="primary" size="medium">
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
