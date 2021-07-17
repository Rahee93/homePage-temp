import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "./TutorialsPage.scss"

const TutorialsPage = () => {
    return (
        <div>
            <Header />
            <div className="section TutorialsPage">
                
                <div className="TutorialsPage-banner">
                    <h1 className="TutorialsPage-banner__title">Tutorials</h1>
                </div>
                <div className="TutorialsPage-content">
                    <div className="TutorialsPage-linkBanner">
                        <a href="https://makecode.microbit.org/#tutorial:github:justinblack0454/hello-tutorial/tutorial">            
                        <div className="TutorialsPage-imghello">
                            <h2 className="TutorialsPage-banner-title">Hello Tutorial</h2>
                            <p className="TutorialsPage-banner-description">just a simple program where your micro:bit says hello to you</p>
                        </div>
                        </a> 
                    </div>

                    <div className="TutorialsPage-linkBanner"></div>
                        <a href="https://makecode.microbit.org/#tutorial:github:afmcdnl/trundle-wheel---tutorial/Tutorial">            
                        <div className="TutorialsPage-img">
                            <h2 className="TutorialsPage-banner-title">Trundle Wheel</h2>
                            <p className="TutorialsPage-banner-description">Using a cardboard wheel and a micro:bit keep track of the distance from one object to another</p>
                        </div>
                        </a> 
                    </div>
                <Footer />

            </div>  
            <Footer />
        </div>
    );
};

export default TutorialsPage;