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
              <li><Link href="/">Home</Link></li>
              <li><Link href="/">Contact</Link></li>
              <li><Link href="/">FAQ</Link></li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Follow us</h4>
            <ui className="list-unstyled">
              <li><Link href="/">Facebook</Link></li>
              <li><Link href="/">Instagram</Link></li>
              <li><Link href="/">Linkedin</Link></li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} 
            Terry Fox | 
            All rights reserved |
            <Link href="/">Terms Of Service</Link> | 
            <Link href="/">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;