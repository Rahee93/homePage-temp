/**
 * This GetStartedPage.js file get data from firebase to render
 * if it's the first step, it will add DOWNLOAD button for users to download hex file
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import { selectSteps } from "../../redux/sections/sections.selectors";
import "./GetStartedPage.scss";

const GetStartedPage = ({ section }) => {
  return (
    <div className="section GetStartedPage">
      <Header />
      <div className="GetStartedPage-banner">
        <h1 className="GetStartedPage-banner__title">Let's Get Started</h1>
      </div>
      <div className="GetStartedPage-content">
        <Container fluid>
          {section && (
            <>
              {section.sectionData.map((el, index) => (
                <Row style={{ marginBottom: "30px" }} key={index}>
                  <Col sm={12} md={4} className="GetStartedPage-content__image">
                    <img src={el.imageUrl} alt="" />
                  </Col>
                  <Col sm={12} md={8} className="">
                    {el.stepNumber === 1 ? (
                      <div className="steps">
                        <h2 className="title" style={{ marginTop: "10px" }}>
                          Step {el.stepNumber}
                        </h2>
                        {el.content.map((para, i) => (
                          <p className="description" key={i}>
                            {para}
                          </p>
                        ))}
                        <div className="text-center mb-3">
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            href="https://drive.google.com/uc?export=download&id=1OddIrpdQtBN3bzLw6kyB00wiOrZEG4aH"
                          >
                            Download
                          </Button>
                        </div>
                        <p className="description text-danger">
                          - Your device (micro:bit) MUST be running our version
                          of code to be able to send data to the marathon.
                        </p>
                        <p className="description">
                          - If your device is not running our version, the step
                          counter may still works BUT the data transfer will not
                          work. THIS IS NOT A BUG.
                        </p>
                      </div>
                    ) : (
                      <div className="steps">
                        <h2 className="title" style={{ marginTop: "10px" }}>
                          Step {el.stepNumber}
                        </h2>
                        {el.content.map((para, i) => (
                          <p className="description" key={i}>
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Container>
      </div>

      <Footer />
      <ScrollTop />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectSteps,
});

export default connect(mapStateToProps)(GetStartedPage);
