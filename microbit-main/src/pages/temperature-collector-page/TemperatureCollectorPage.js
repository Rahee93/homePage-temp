import React from "react";

import EmbededPage from "../../components/embeded-page/EmbededPage"
import Header from "../../components/header/Header";
import BackToTop from "../../components/scroll-top/ScrollTop";
import Footer from "../../components/footer/Footer";
const TemperatureCollectorPage = () => {
return (
    <>
    <Header />
    <EmbededPage src="/microbit-temperature-collector"/>
    <Footer />
    </>
);
};


export default TemperatureCollectorPage;