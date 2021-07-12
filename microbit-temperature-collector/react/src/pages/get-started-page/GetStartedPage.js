/**
 * This GetStartedPage.js file 
 */

import React from "react";
import { StylesProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel  from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import green from '@material-ui/core/colors/green';
import microbitTemperature from "../../assets/photo/temperature.png";
import "./GetStartedPage.scss";

function getSteps() {
  return [
    'Download The Program',
    'Upload Program to Your Micro:bit',
    'Now Shake your Micro:bit!',
    'Your Micro:bit is now Ready to Record Temperature',
    'Upload Temperature Data to Our Server'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <>Please click <a href="https://firebasestorage.googleapis.com/v0/b/microbit-terry-fox-90137.appspot.com/o/temperature_collector.hex?alt=media&token=f15d210a-ce78-410f-a8ec-b460d9c60f8d">here</a> to download the .hex temperature collector program.</>;
    case 1:
      return <><p>- Connect your Micro:bit to a USB port on your computer</p>
            <p>- Drag and drop the .hex temperature collector programm from the location where you downloaded to your Micro:bit</p>
            <p>- After transfering the program to Micro:bit, you can see a happy face on your Micro:bit</p>
            </>;
    case 2:
      return <> 
        <p>Now try to shake your Micro:bit, you should see current room temperature on the screen, like:</p>
        <img src={microbitTemperature}>
        </img>
      </>;
    case 3: 
      return <><p>- Now you are ready to collect the temperature, please first connect your Micro:bit to a power source like batteries</p>
      <p>- Press button "B" on your Micro:bit to start recording temperature when you are ready</p>
      <p>- After you complete recording, press button "B" to stop recording</p>
      <p><DoneAllIcon style={{ color: green[500] }}/> Please <b>do not</b> start recording again before you upload the data, becuase it will overwrite your previously recorded data</p>
      <p>- Temperature data is collected daily, and it is better to keep your Micro:bit for more than 5 days to record meaningful data</p></>
    case 4:
      return <>
        <p>When you are ready to upload your temperature data to our server, please go to <Link to='/upload-data'>Upload Temperature Data</Link> page for details.</p>
      </>
    default:
      return 'Unknown step';
  }
}

const GetStartedPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <StylesProvider injectFirst>
    <Header />
      <div className="GetStartedPage-banner">
        <h1 className="GetStartedPage-banner__title">Let's Get Started</h1>
      </div>
        <div className={"GetStartedPage-stepper"}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel style={{cursor: 'pointer'}} onClick={() => setActiveStep(index)}> <span style={{fontFamily:"KidsRock", fontSize: '1.5rem'}}>{label}</span></StepLabel>
                <StepContent>
                  <Typography style={{fontSize: '1.2rem'}}>{getStepContent(index)}</Typography>
                  <div className="GetStartedPage-stepper-actions">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className="GetStartedPage-stepper-actions-button"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className="GetStartedPage-stepper-actions-button"
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={2} className={"GetStartedPage-reset"}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} style={{fontFamily:"Boogaloo"}}>
                Want to try again ?
              </Button>
            </Paper>
          )}
        </div>
    <Footer />
      <ScrollTop />
    </StylesProvider>
  );
};

export default GetStartedPage;
