/**
 * This GalleryPage.js file get data from firebase to render image
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import Header from "../../components/header/Header";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Footer from "../../components/footer/Footer";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import { selectGallery } from "../../redux/sections/sections.selectors";

import "./GalleryPage.scss";

const GalleryPage = ({ section }) => {
  return (
    <div className="section GalleryPage">
      <Header />
      <div className="GalleryPage-banner">
        <h1 className="GalleryPage-banner__title">Project's Gallery</h1>
      </div>
      <div className="GalleryPage-content">
        {section && (
          <Container style={{ marginBottom: `30px` }}>
            <Row>
              <p className="text mx-auto mb-5">
                Thank you so much for joining us and participating in this
                digital Marathon of Hope.
                <br />
                To contribute photos to our gallery, please email us at
                microbit.terryfox@gmail.com
              </p>
            </Row>
            <Row>
              {section.sectionData.map((image, index) => (
                <Col xs={12} md={6} lg={4} xl={3} key={index}>
                  <a href={image.imageUrl}>
                    <Image
                      src={image.imageUrl}
                      key={index}
                      alt={image.alt}
                      thumbnail
                      style={{
                        marginBottom: `7px`,
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <p
                    style={{
                      marginBottom: `10px`,
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Photo Credit: {image.credit}
                  </p>
                  <p
                    className="bold"
                    style={{
                      fontSize: "16px",
                      marginBottom: `30px`,
                      textAlign: "center",
                    }}
                  >
                    {image.content}
                  </p>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
      <Footer />
      <ScrollTop />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectGallery,
});

export default connect(mapStateToProps)(GalleryPage);
