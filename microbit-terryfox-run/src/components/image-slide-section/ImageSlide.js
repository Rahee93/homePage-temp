/**
 * This ImageSlide.js file contains images to display on Image Carousel in Homepage
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { selectImageSlides } from "../../redux/sections/sections.selectors";

import "./ImageSlide.scss";

const ImageSlide = ({ section }) => {
  return (
    <div className="ImageSlide">
      {section && (
        <Carousel>
          {section.sectionData.map((image, index) => (
            <Carousel.Item interval={3000} key={index}>
              <img className="d-block" src={image.imageUrl} alt={image.alt} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectImageSlides,
});

export default connect(mapStateToProps)(ImageSlide);
