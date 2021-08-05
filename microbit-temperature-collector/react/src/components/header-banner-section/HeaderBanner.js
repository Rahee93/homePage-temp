
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./HeaderBanner.scss";

 const HeaderBanner = () => {
     return(

        <div className = "HeaderBanner">
        <div className="HeaderBanner-banner">
            <h1 className="HeaderBanner__title">Temperature Collector</h1>
            <div className="HeaderBanner__button">
                <Link to ="/get-started-page">
                    <button className="HeaderBanner-banner_button">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
        </div>


     );
 };

 export default HeaderBanner