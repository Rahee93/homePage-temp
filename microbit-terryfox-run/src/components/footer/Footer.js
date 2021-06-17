import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>TerryFox</h4>
            <ui className="list-unstyled">
              <li>613-000-0000</li>
              <li>Ontario, Ottawa</li>
              <li>123 Street South Keys</li>
            </ui>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Links</h4>
            <ui className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">FAQ</a></li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Follow us</h4>
            <ui className="list-unstyled">
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Linkedin</a></li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} 
            Terry Fox | 
            All rights reserved |
            <a href="/">Terms Of Service</a> | 
            <a href="/">Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;