import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>TerryFox</h4>
              613-000-0000<br />
              Ontario, Ottawa<br />
              123 Street South Keys<br />
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Links</h4>
            <ui className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact-us">Contact</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Follow us</h4>
            <ui className="list-unstyled">
              <li><Link to="/">Facebook</Link></li>
              <li><Link to="/">Instagram</Link></li>
              <li><Link to="/">LinkedIn</Link></li>
            
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} 
            Terry Fox | 
            All rights reserved |
            <Link to="/">Terms Of Service</Link> | 
            <Link to="/">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;