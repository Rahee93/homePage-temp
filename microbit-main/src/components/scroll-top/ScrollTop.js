/**
 * This ScrollTop.js file contains scroll to top button to display on all pages
 */

import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const classes = useStyles();
  const toggleVisibility = () => {
    window.pageYOffset > 100 ? setIsVisible(true) : setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="ScrollTop">
      {isVisible && (
        <Fab
          color="primary"
          // aria-label="scroll back to top"
          size="medium"
          onClick={scrollToTop}
          className={classes.root}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </div>
  );
};

export default ScrollTop;
