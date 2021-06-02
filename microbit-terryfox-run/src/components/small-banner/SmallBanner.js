/**
 * This SmallBanner.js file contains image after each section in homepage
 */

import React from "react";

import "./SmallBanner.scss";
const SmallBanner = ({ url }) => {
  return (
    <div className="SmallBanner">
      <div
        className="SmallBanner-image"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3)), " +
            "url(" +
            url +
            ")",
        }}
      ></div>
    </div>
  );
};

export default SmallBanner;
