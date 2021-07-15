import React from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/scroll-top/ScrollTop";
import AvgTempLineChart from "./ChartConfig";
import mockChart from "../../assets/photo/mockchart.PNG";

const ChartsPage = () => {
    return (
        <>
        <Header />
        <img width="900px"style={{flex: '1 1 auto', alignSelf:'center'}} src={mockChart}/>
        <AvgTempLineChart/>
        <Footer />
        <BackToTop />
        </>
    )
};


export default ChartsPage;
 