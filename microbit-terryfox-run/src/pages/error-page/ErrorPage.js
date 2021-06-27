/**
 * This ErrorPage.js catch error for when the Web Serial API is not available for current browser
 */

 import React from "react";
 import Button from "@material-ui/core/Button";
 import { Link } from "react-router-dom";
 
 import "./ErrorPage.scss";
 
 export const ErrorCancelButton = () => {
   return (
     <div className="error-page vh-100">
       <div className="wrapper p-5 w-100 h-80 d-flex flex-column justify-content-center align-items-center ">
         {/* <div className="wrapper"> */}
         <div className="image mb-5" />
         <h2 className="title mb-4">Sorry! Current browser is not available and does not support uploading data from micro:bit. </h2>
         <div className="description">
           <p>
            Web Serial API is not available for current browser.
           </p>
           <div className="d-flex justify-content-center">
             <Link to="/microbit-sync">
               <Button variant="contained" color="primary" size="medium">
                 Go Back
               </Button>
             </Link>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default ErrorCancelButton;
 