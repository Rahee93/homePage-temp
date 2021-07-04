import React, { Component } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { findColor } from './Colors';
import { Link } from "react-router-dom";
import Color from './Color';
import './SchoolDetailsSlideOut.scss';

const sumReducer = (accumulator, currentValue) => accumulator + currentValue;
export const calculateMaxAndMinTemperature = (temperatureDataByDate) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  Object.values(temperatureDataByDate).forEach((temperatureData) => {
    const averageTemerature = Math.round(temperatureData.reduce(sumReducer) / temperatureData.length);
    if(averageTemerature < min){
      min = averageTemerature;
    }
    if(averageTemerature > max) {
      max = averageTemerature;
    }
  });
  return {
    min,
    max
  };
}

class SchoolDetailsSlideOut extends Component {
  render() {
    const schoolName = this.props.schoolList[this.props.currentSelectedSchoolId] && this.props.schoolList[this.props.currentSelectedSchoolId].School_Name;
    const schoolAddress = this.props.schoolList[this.props.currentSelectedSchoolId] && this.props.schoolList[this.props.currentSelectedSchoolId].Street;
    const schoolCity = this.props.schoolList[this.props.currentSelectedSchoolId] && this.props.schoolList[this.props.currentSelectedSchoolId].City;
    const schoolProvince = this.props.schoolList[this.props.currentSelectedSchoolId] && this.props.schoolList[this.props.currentSelectedSchoolId].Province;
    const temperatureDataByDate = this.props.temperatureDataBySchool[this.props.currentSelectedSchoolId];
    const minMaxTemperature = temperatureDataByDate && calculateMaxAndMinTemperature(temperatureDataByDate);
    return (
      <StylesProvider injectFirst>
        <Drawer anchor="right" open={this.props.open} onClose={this.props.onClose}>
          <div className="schoolDetailsSlideOut">
            <Typography className="schoolDetailsSlideOut-section" variant="h6">{schoolName}</Typography>
            <Divider light />
            <div className="schoolDetailsSlideOut-section">
              <Typography gutterBottom>{"Street: " + schoolAddress}</Typography>
              <Typography gutterBottom>{"City: " + schoolCity}</Typography>
              <Typography gutterBottom>{"Province: " + schoolProvince}</Typography>
            </div>
            <Divider light />
            <Accordion square className="schoolDetailsSlideOut-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="more"
                className="schoolDetailsSlideOut-accordion-summary"
              >
                {temperatureDataByDate ? <>
                  <Typography gutterBottom>Average Temerature Range</Typography>
                <div style={{backgroundImage:`linear-gradient( to right,
                  ${findColor(minMaxTemperature.min)[this.props.colorBlindMode ? 'colorA' : 'color']} 0%,
                  ${findColor(minMaxTemperature.min * minMaxTemperature.max < 0 ? -1 : Math.round((minMaxTemperature.min + minMaxTemperature.max)/2))[this.props.colorBlindMode ? 'colorA' : 'color']} 30%,
                  ${findColor(minMaxTemperature.min * minMaxTemperature.max < 0 ? 1 : Math.round((minMaxTemperature.min + minMaxTemperature.max))/2)[this.props.colorBlindMode ? 'colorA' : 'color']} 70%,
                  ${findColor(minMaxTemperature.max)[this.props.colorBlindMode ? 'colorA' : 'color']} 100%)`,
                  padding: '15px', display: 'flex', justifyContent:'space-between'}}>
                  <Typography>{minMaxTemperature.min + " °C"}</Typography>
                  <Typography>{minMaxTemperature.max + " °C"}</Typography>
                </div>
                </> : <Typography>No Temerature Data</Typography>}
              </AccordionSummary>
              <AccordionDetails>
                {temperatureDataByDate ?  <div style={{width:"80%"}}>
                  <Typography gutterBottom>
                    Average Temperature By Date
                  </Typography>
                  {
                    Object.keys(temperatureDataByDate).sort().map((date, index) => {
                      const averageTemerature = Math.round(temperatureDataByDate[date].reduce(sumReducer) / temperatureDataByDate[date].length);
                      return <Color key={index} label={date + ": " + averageTemerature + " °C"} color={findColor(averageTemerature)[this.props.colorBlindMode ? 'colorA' : 'color']}/>;
                    })
                  }
                </div>:<Typography>
                   Didn't see any temerature data for your school? You can check <Link to='/get-started'>Get Started</Link> page to see how to record and upload the temerature data for your school.
                </Typography>}
              </AccordionDetails>
            </Accordion>
          </div>
        </Drawer>
      </StylesProvider>
    );
  }
}

export default SchoolDetailsSlideOut;
