
/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */

import React from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";
import EmbededPage from "../../components/embeded-page/EmbededPage"


const HomePage = () => {

  return (
    <>
      <Header />
      <EmbededPage src="https://microbit.org/get-started/home-learning/"/>
      <Footer />
      <BackToTop />
    </>
  );
};


export default HomePage;
// export default HomePage;
