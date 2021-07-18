
import React from "react";
import Header from "../../components/header/Header";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import Footer from "../../components/footer/Footer";
import Mailer from "../../components/contact-us/Mailer";
import "./ContactUsPage.scss";

function ContactUsPage() {
  return (
    <>
      <Header />
      <Mailer />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default ContactUsPage;