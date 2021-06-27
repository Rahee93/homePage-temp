/**
 * @author Thanh Hue Pham
 * @date January 29, 2021
 * @description Web application that takes data (steps counter) from user's
 * microbit via WEB USB and plotting result on map
 */

/**
 * This MapJournal.js file contains the interactive google map with
 * Terry Fox's journal on each location
 */

import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { selectMapJournal } from "../../redux/sections/sections.selectors";

import "./MapJournal.scss";

const MapJournal = ({ section }) => {
  const iframe =
    '<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1uqWCxNlKND_e6xIyPnGT6zj9560JpHdW" zoom="4" width="100%" height="550"></iframe>';
  return (
    <div className="section MapJournal">
      {section && (
        <>
          <h1 className="MapJournal-title">{section.name}</h1>
          <div className="MapJournal-content mb-5">
            <Container>
              <Row>
                <Col
                  md={12}
                  lg={6}
                  className="MapJournal-content__image mt-4 pr-4"
                >
                  <img
                    src={section.sectionData[0].imageUrl}
                    alt={section.sectionData[0].alt}
                  />
                  <span className="">
                    Photo Credit: OrwellToday{" "}
                    <a href="https://www.orwelltoday.com/foxterryconnections.shtml">
                      (link)
                    </a>
                  </span>
                </Col>
                <Col md={12} lg={6}>
                  {section.sectionData[0].content.map((p, i) => (
                    <p key={i} className="MapJournal-content__description mt-4">
                      {p}
                    </p>
                  ))}
                  <p className="MapJournal-content__description mt-4">
                    More information can be found at the Terry Fox Foundation
                    Website <a href="https://terryfox.org/">(link)</a>
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <Container>
            <div className="interactive">
              <h1>Interactive Map with Journal</h1>
              <p className="interactive-description">
                Click number on the map to read more about Terry Fox's journal
                at each point. Starting at number 1.
              </p>
            </div>
            <div
              className="interactive-map"
              dangerouslySetInnerHTML={{ __html: iframe }}
            ></div>
          </Container>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  section: selectMapJournal,
});

export default connect(mapStateToProps)(MapJournal);
