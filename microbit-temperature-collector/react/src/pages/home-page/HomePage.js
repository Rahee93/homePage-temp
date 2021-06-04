
/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */

import React from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";

const HomePage = () => {

  return (
    <>
      <Header />
      <Footer />
      <BackToTop />
    </>
  );
};


export default HomePage;
// export default HomePage;
