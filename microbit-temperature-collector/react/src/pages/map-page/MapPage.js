

import React from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";

const MapPage = () => {
    return (
        <>
        <Header />
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62468.93303492815!2d-75.67663012643989!3d45.41097157881095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1623801300587!5m2!1sen!2sca" width="600px"style={{flex: '1 1 auto', alignSelf:'center'}} allowfullscreen="" loading="lazy">

        </iframe>
        <Footer />
        <BackToTop />
        </>
    )
};


export default MapPage;
 