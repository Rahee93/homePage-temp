import React from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";
import AvgTempLineChart from "./ChartConfig";
import mockChart from "../../assets/photo/mockchart.PNG";
import './ChartsPage.scss';

const ChartsPage = () => {
    return (
        <>
        <Header />
        <div className="ChartsPage-banner">
            <h1 className="ChartsPage-banner__title">Charts</h1>
        </div>
        <p className="ChartsPage-content">Below is a line chart depicting the average temperature over time for your school:</p>
        <AvgTempLineChart/>
        <p className="ChartsPage-content">Below is a mock bar chart (to be replaced with a real chart!):</p>
        <img width="900px"style={{flex: '1 1 auto', alignSelf:'center'}} src={mockChart}/>
        <Footer />
        <BackToTop />
        </>
    )
};


export default ChartsPage;
 