
/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */
 import React, { useEffect } from "react";
 import { connect } from "react-redux";

import Header from "../../components/header/Header";
import ImageSlide from "../../components/image-slide-section/ImageSlide";
import { fetchSectionsStartAsync } from "../../redux/sections/sections.actions";
import SmallBanner from "../../components/small-banner/SmallBanner";
import BackToTop from "../../components/scroll-top/ScrollTop";
import Button from "@material-ui/core/Button";
import HeaderBanner from "../../components/header-banner-section/HeaderBanner";
import "./HomePage.scss";
import banner33 from "../../assets/photo/banner33.jpg";
import MainContent from "../../components/main-content-section/MainContent";



//const HomePage = () => {
const HomePage = ({ fetchSectionsStartAsync }) => {
    useEffect(() => {
      fetchSectionsStartAsync();
    }, [fetchSectionsStartAsync]);

  return (
    <>
    <Header />
    <ImageSlide/>
    <HeaderBanner/>
    <MainContent/>
    {/* <div className = "HomePage-image"></div>
      <div className="HomePage-content">
      <h1 className="mb-temp">Welcome to Temperature Collector</h1>
      <p>
        Temperature sensor is an input device that works 
        as a thermometer. The BBC micro:bit has a temperature 
        sensor inside the processor, providing an approximated reading for the ambient temperature. 
        The micro:bit temperature sensor is very easy and convenient for kids to use. 
        Start by downloading the temperature collector program and upload it into the microbit device. Then you can start to collect the temperatures for your school.
        Micro:bit temperature collector is a very interesting little 
        device for kids to learn and encourage them do more outdoor activities. Kids can have fun by experiencing how the micro:bit is displaying the temperature around them and how it collects the temperatures of their schools.  
      </p>
      </div> */}
      <SmallBanner url={banner33} />
      <div className="HomePage-vid">
      <video className="video" width="320" height="240"controls >
      <source src="https://hackster.imgix.net/uploads/attachments/459385/ezgif_com-video-to-gif_(1)_X7HdhkgxD2.gif?auto=format%2Ccompress&gifq=35&w=900&h=675&fit=min&fm=mp4" type="video/mp4"></source>
      </video>
      </div>
      <BackToTop/>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSectionsStartAsync: () => dispatch(fetchSectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(HomePage);


