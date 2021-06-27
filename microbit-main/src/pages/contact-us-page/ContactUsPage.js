/**
 * This ContactUsPage.js display contact information
 */

import React from "react";
import Header from "../../components/header/Header";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import Footer from "../../components/footer/Footer";

import "./ContactUsPage.scss";

const ContactUsPage = () => {
  return (
    <>
      <Header />
      
      <div className="ContactUsPage-banner">
        <h1 className="ContactUsPage-banner__title">Contact Us</h1>
      </div>
      <div className="ContactUsPage-content">
        <h3 className="mb-4">Send us an email</h3>
        <p>
          If you would like to contact us, contribute to our gallery, report any
          technical difficulties you experience with our website, or provide
          suggestions for improvement, please email us at:
        </p>
        <p>Email: microbit.terryfox@gmail.com</p>
        <p>We appreciate your help!</p>
      </div>

      <Footer />
      <ScrollTop />
    </>
  );
};

export default ContactUsPage;
