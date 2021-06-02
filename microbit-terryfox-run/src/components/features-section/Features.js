/**
 * This Features.js file contains information to display 4 main features on HomePage
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import FeatureCard from "../feature-card/FeatureCard";
import { selectFeatures } from "../../redux/sections/sections.selectors";
import "./Features.scss";

const Features = ({ section }) => {
  return (
    <div className="section Features">
      <Container fluid>
        <Row>
          {section && (
            <>
              {section.sectionData.map((el, index) => (
                <Col sm={12} md={6} lg={6} xl={3} key={index}>
                  <FeatureCard
                    color={el.color}
                    title={el.title}
                    content={el.content}
                    image={el.imageUrl}
                    alt={el.alt}
                  />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectFeatures,
});

export default connect(mapStateToProps)(Features);
