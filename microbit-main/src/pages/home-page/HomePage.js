
/**
 * This HomePage.js file calls other smaller components to make the HomePage
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";
import AboutUs from "../../components/about-us-section/AboutUs";
import { fetchSectionsStartAsync } from "../../redux/sections/sections.actions";
import SmallBanner from "../../components/small-banner/SmallBanner";
import banner1 from "../../assets/photo/banner1.png";
import banner3 from "../../assets/photo/banner3.jpg";




const HomePage= ({ fetchSectionsStartAsync }) => {
  useEffect(() => {
    fetchSectionsStartAsync();
  }, [fetchSectionsStartAsync]);

  return (
    <div className="HomePage">
      <Header />
      <SmallBanner url={banner1} />
      <AboutUs/> <img src="https://lh3.googleusercontent.com/proxy/fySn-eVwg_y4mVPucEMo2QhlmO_nDPsZM3CFMZ_Sz-A-LV8-LmaJfZA8p8XtsCRsm-GLiWa7dGu4iVrwmYN8li--YW-djC9xmhxiUK3unh6fdNXMTBgD-Cb9Mxw" />
      <SmallBanner url={banner3} />
      <Footer />
      <BackToTop />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSectionsStartAsync: () => dispatch(fetchSectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(HomePage);
// export default HomePage;


