/**
 * This ErrorCancelButton.js catch error for pressing CANCEL button during paring mode
 */

import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./ErrorCancelButton.scss";

export const ErrorCancelButton = () => {
  return (
    <div className="error-boundary-cancel vh-100">
      <div className="wrapper p-5 w-100 h-80 d-flex flex-column justify-content-center align-items-center ">
        {/* <div className="wrapper"> */}
        <div className="image mb-5" />
        <h2 className="title mb-4">Sorry! A Dog Ate this Page</h2>
        <div className="description">
          <p>
            Pressing CANCEL button during paring mode can cause interrupted
            connection, please reconnect microbit to computer.
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

export default ErrorCancelButton;
