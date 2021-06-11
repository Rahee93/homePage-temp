import React from "react";
import { StylesProvider } from '@material-ui/core/styles';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ScrollTop from "../../components/scroll-top/ScrollTop";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import UsbIcon from '@material-ui/icons/Usb';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './UploadDataPage.scss';

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <EventIcon />,
      2: <PlaceIcon/>,
      3: <UsbIcon />,
      4: <CloudUploadIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
//   const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//     },
//     button: {
//       marginRight: theme.spacing(1),
//     },
//     instructions: {
//       marginTop: theme.spacing(1),
//       marginBottom: theme.spacing(1),
//     },
//   }));
  
  function getSteps() {
    return ['Start date of temperature recording', 'Where you record the temperature', 'Connect your Micro:bit to computer', 'Upload Data'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Start date of temperature recording';
      case 1:
        return 'Where you record the temperature';
      case 2:
        return 'Connect your Micro:bit to computer';
      case 3:
        return 'Upload Data';
      default:
        return 'Unknown step';
    }
  }
class UploadDataPage extends React.Component {

    state = {
        activeStep: 0
    }

    steps = getSteps();

    setActiveStep = (activeStep) => {
        this.setState({
            activeStep
        })
    }

    handleNext = () => {
        this.setActiveStep(this.state.activeStep + 1);
    };

    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };

    handleReset = () => {
        this.setActiveStep(0);
    };
    render() {
        return  <StylesProvider injectFirst>
            <Header />
            <div className="UploadDataPage-banner">
                <h1 className="UploadDataPage-banner__title">Upload Your Data</h1>
            </div>
            <div className='UploadDataPage'>
                <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<ColorlibConnector />}>
                    {this.steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <div className='UploadDataPage-stepper-content'>
                    {this.state.activeStep === this.steps.length ? (
                        <>
                        <Typography>
                        All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={this.handleReset} className='UploadDataPage-stepper-content-button'>
                        Reset
                        </Button>
                        </>
                    ) : (
                        <>
                        <Typography style={{fontSize: '1.2rem', marginTop: '8px', marginBottom: '8px'}}>{getStepContent(this.state.activeStep)}</Typography>
                        <div style={{display: 'flex'}}>
                        <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className='UploadDataPage-stepper-content-button'>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className='UploadDataPage-stepper-content-button'
                        >
                            {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
            <ScrollTop />
        </StylesProvider>
    }
}

export default UploadDataPage