/**
 * @author Thanh Hue Pham
 * @date January 29, 2021
 * @description Web application that takes data (steps counter) from user's
 * microbit via WEB USB and plotting result on map
 */

/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/header/Header";
import Features from "../../components/features-section/Features";
import ImageSlide from "../../components/image-slide-section/ImageSlide";
import AboutUs from "../../components/about-us-section/AboutUs";
import SmallBanner from "../../components/small-banner/SmallBanner";
import GallerySection from "../../components/gallery-section/GallerySection";
import GetStarted from "../../components/get-started-section/GetStarted";
import MapJournal from "../../components/map-journal-section/MapJournal";
import BackToTop from "../../components/scroll-top/ScrollTop";
import banner1 from "../../assets/photo/banner1.jpg";
import banner2 from "../../assets/photo/banner2.png";
import banner3 from "../../assets/photo/banner3.jpg";
import Button from "@material-ui/core/Button";
import { fetchSectionsStartAsync } from "../../redux/sections/sections.actions";

const HomePage = ({ fetchSectionsStartAsync }) => {
  useEffect(() => {
    fetchSectionsStartAsync();
  }, [fetchSectionsStartAsync]);

  return (
    <div className="HomePage">
      <Header />
      <ImageSlide />
      <Features />
      <AboutUs />
      <SmallBanner url={banner2} />
      <MapJournal />
      <SmallBanner url={banner1} />
      <GetStarted />
      <SmallBanner url={banner3} />
      <GallerySection />
      <BackToTop />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSectionsStartAsync: () => dispatch(fetchSectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(HomePage);
// export default HomePage;
