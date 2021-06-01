/**
 * This Header.js file contains information to display Header on all pages
 */

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/photo/microbit-icon.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Navbar className="navbar" bg="white" expand="lg" name="top">
        {/* <Navbar.Brand className="navbar-headers">
          <Link to="/" className="navbar-headers">
            <div className="navbar-headers__image"></div>
            <span className="navbar-headers__title">TerryFox Kids</span>
          </Link>
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Link to="/" className="navbar-nav__item p-2">
              Home
            </Link>
            <Link to="/terry-fox-run" className="navbar-nav__item p-2">
              TerryFox Run
            </Link>
            <Link to="/temperature-collector" className="navbar-nav__item p-2">
              Temperature Collector
            </Link>
            <Link /*to="/dictionary"*/ className="navbar-nav__item p-2">
              Dictionary
            </Link>
            <Link to="/tutorials" className="navbar-nav__item p-2">
              Tutorials
            </Link>
            <Link /*to="/contact-us"*/ className="navbar-nav__item p-2">
              Contact Us
            </Link>
          </Nav>
          {/* <Nav className="ml-auto">
            <Link to="/microbit-sync">
              <img
                className="navbar-icons__logo"
                src={logo}
                alt="microbit-logo"
              />
            </Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
