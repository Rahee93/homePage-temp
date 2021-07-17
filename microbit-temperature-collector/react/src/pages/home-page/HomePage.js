
/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */

import React from "react";

import Header from "../../components/header/Header";
import BackToTop from "../../components/scroll-top/ScrollTop";

const HomePage = () => {

  return (
    <>
      <Header />
      <div style={{flex: '1 1 auto'}}>test home page</div>
      <BackToTop />
    </>
  );
};


export default HomePage;
// export default HomePage;
