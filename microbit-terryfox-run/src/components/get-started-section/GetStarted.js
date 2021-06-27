/**
 * This GetStarted.js file contains information to display on GetStarted Section in Homepage
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { selectSteps } from "../../redux/sections/sections.selectors";
import "./GetStarted.scss";

const GetStarted = () => {
  return (
    <div className="section GetStarted">
      <h1 className="GetStarted-title">Get Started</h1>
      <div className="GetStarted-content">
        <p>
          Do you know that you can turn your micro:bit into a step counter (or
          pedometer) to participate in our Marathon Of Hope and learn some
          coding at the same time!
        </p>
        <p>
          Make sure you have your Mirco:bit and your battery pack first, then
          click button below to join us!
        </p>
      </div>
      <Link to="/get-started">
        <Button variant="contained" color="primary" size="medium">
          See More
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectSteps,
});

export default connect(mapStateToProps)(GetStarted);
