
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
      <AboutUs/> <img src="https://lh3.googleusercontent.com/proxy/kI_WxQ6SXmXd6XHdS6HCaheN6D8Ok3lFV0qSloaj2hOPew5LEeI-BczR1bTIadzSOGKlYRXqoMVnier6sAziv0ffYaWJUU63oi5gpHECV3gIoehSO6QRnvfZ1ag" />
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


