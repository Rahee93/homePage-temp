import React from "react";
import "./MainContent.scss";


 const MainContent = () => {
     return(

        <div className = "MainContent">
        <div className="MainContent-content">
            <h1 className="MainContent_title">Welcome to Temperature Collector</h1>
            <div className="MainContent_content">
                <p>
                    Temperature sensor is an input device that works 
                    as a thermometer. The BBC micro:bit has a temperature 
                    sensor inside the processor, providing an approximated reading for the ambient temperature. 
                    The micro:bit temperature sensor is very easy and convenient for kids to use. 
                    Start by downloading the temperature collector program and upload it into the microbit device. Then you can start to collect the temperatures for your school.
                    Micro:bit temperature collector is a very interesting little 
                    device for kids to learn and encourage them do more outdoor activities. Kids can have fun by experiencing how the micro:bit is displaying the temperature around them and how it collects the temperatures of their schools.  
                </p>
            </div>
        </div>
        </div>

     );
 };

 export default MainContent