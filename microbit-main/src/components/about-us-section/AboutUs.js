/**
 * This AboutUs.js file contains information to display About Us section on HomePage
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectAboutUs } from "../../redux/sections/sections.selectors";

import "./AboutUs.scss";

const AboutUs = ({ section }) => {
  return (
    <div className="section AboutUs mt-4">
      {section && (
        <>
          <h1 className="AboutUs-title">Micro:bit Main Page!</h1>
          <p />
          <p />
          <h1 className="AboutUs-subtitle">{section.name}</h1>
          <div className="AboutUs-content p-3" >
            {section.sectionData.map((para, index) => (
              <p key={index}>{para.content}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectAboutUs,
});

export default connect(mapStateToProps)(AboutUs);
