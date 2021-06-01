/**
 * @author  Thanh Hue Pham
 * @date January 29, 2021
 * @description Web application that takes data (steps counter) from user's
 * microbit via WEB USB and plotting result on map
 */

/**
 * This MapPage.js file serves 3 features:
 *  1. calls Map component to display Map with correct location based on calculated distance
 *  2. renders 5 newest users' time of updates
 *  3. displays 'Congratuations' and announcement for next marathon when the km is greater
 *  than 5373 (end of marathon)
 */

import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import Map from "../../components/map/Map";
import Header from "../../components/header/Header";
import { firestore } from "../../firebase/firebase";
import { Link } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import "./MapPage.scss";
import { fetchCounterStartAsync } from "../../redux/counter/counter.actions";
import {
  selectkmCounter,
  selectNewestTimeUpdates,
} from "../../redux/counter/counter.selectors";

const MapPage = ({ fetchCounterStartAsync, counter, newestTimeUpdates }) => {
  const [date, setDate] = useState("");

  const fetchNextMarathon = async () => {
    const statusRef = firestore.collection("nextMarathon");
    const data = await statusRef.get();
    data.docs.forEach((item) => setDate(item.data().nextDate));
  };
  // console.log("called");

  useEffect(() => {
    // console.log("render");
    fetchNextMarathon();
    fetchCounterStartAsync();
  }, [fetchCounterStartAsync]);

  return (
    <div className="section MapPage">
      <Header />
      <div className="MapPage-banner">
        <h1 className="MapPage-banner__title">Latest Map</h1>
      </div>

      {counter && (
        <div className="MapPage-content">
          <h1 className="mb-4">Our map is here!</h1>
          {counter >= 5373 ? (
            <div className="mb-4">
              <h4 className="mb-4">Congratulations everyone!</h4>
              <div className="mb-2">
                We've run 5,373 km total and finished the Marathon Of Hope!
              </div>
              <span className="text-danger">{date}</span>
            </div>
          ) : (
            <>
              <h4 className="mb-5">We've run {counter.toFixed(2)} km total</h4>
              {newestTimeUpdates &&
                newestTimeUpdates.map((time, i) => (
                  <p key={i}>
                    <span></span>🌟 One one of our runners just successfully
                    uploaded data on {time} 🌟
                  </p>
                ))}
            </>
          )}
          <Map className="MapPage-content__map" counter={counter} />
        </div>
      )}
      <Footer />
      <ScrollTop />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  counter: selectkmCounter,
  newestTimeUpdates: selectNewestTimeUpdates,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCounterStartAsync: () => dispatch(fetchCounterStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
