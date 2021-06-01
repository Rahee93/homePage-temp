/**
 * This GallerySection.js file contains information to display on GallerySection in Homepage
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { selectGallery } from "../../redux/sections/sections.selectors";
import "./GallerySection.scss";

const GallerySection = ({ section }) => {
  return (
    <div className="section GallerySection">
      {section && (
        <>
          <h1 className="GallerySection-title">{section.name}</h1>
          <Container fluid className="GallerySection-content">
            <Row>
              {section.sectionData.slice(0, 8).map((image, index) => (
                <Col xs={12} md={6} lg={3} key={image.id}>
                  <a href={image.imageUrl}>
                    <Image
                      key={index}
                      src={image.imageUrl}
                      alt={image.alt}
                      className="GallerySection-image"
                      thumbnail
                      style={{
                        marginBottom: `30px`,
                        objectFit: "cover",
                        height: "210px",
                      }}
                    />
                  </a>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}

      <Link to="/gallery">
        <Button variant="contained" color="primary" size="medium">
          See More
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectGallery,
});

export default connect(mapStateToProps)(GallerySection);
