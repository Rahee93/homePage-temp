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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from "../../firebase/firebase";
import Grid from '@material-ui/core/Grid';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import LinkIcon from '@material-ui/icons/Link';
import { connectMicrobit } from './ConnectMicrobit';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';
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
class UploadDataPage extends React.Component {
  setActiveStep = (activeStep) => {
    this.setState({
        activeStep
    })
  }

  fetchSchoolList = () => {
    // loading the school list
    this.setState({
      schoolData: {
        ...this.state.schoolData,
        loadingSchooleList: true
      }
    });
    // load school list data
    firestore
      .collection("temperature-collector-school-list")
      .orderBy("School_Name", "asc")
      .get()
      .then((snapshot) => {
        this.setState({
          schoolData: {
            schooleList: snapshot.docs.map((doc) => ({ value: doc.id, label: doc.get('School_Name') })),
            loadingSchooleList: false
          }
        });
      });
  }

  componentDidMount() {
    this.fetchSchoolList();
  }

  componentWillUnmount() {
    this.closeSerial();
  }

  closeSerial = async () => {
    if(this.state.serial) {
      try {
        this.state.serial.controller.abort();
        // need to wait to unlock on the stream
        await new Promise((res) => setTimeout(() => res(), 1000));
        await this.state.serial.port.close();
      } catch(e) {
        console.log(e);
      }
    } 
  }

  readLoop = async () => {
    let reader;
    try {
      reader = this.state.serial.reader;
      const date = moment(this.startDate, 'YYYY-MM-DD');
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("read is complete");
          break;
        }
        if(value !== '-1') {
          const intValue = parseInt(value);
          if(!isNaN(intValue)) {
            // set to uploading to true when we receive the first data
            if(!this.state.uploadDataState.uploading) {
              this.setState({
                uploadDataState:{
                  ...this.state.uploadDataState,
                  uploading: true
                }
              });
            }
            console.log(intValue);
            if(date.isBefore(moment())) {
              this.setState({
                temperatureData: {
                  ...this.state.temperatureData,
                  [date.format('YYYY-MM-DD')]: intValue
                }
              });
              date.add(1, 'day');
            } else {
              // if now we already have read the temperature data until today, we should not continue
              reader.cancel();
            }
          }
        } else {
          reader.cancel();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      reader.releaseLock();

      this.uploadData();
    }
  }

  uploadData = async () => {
    if(this.state.temperatureData && Object.keys(this.state.temperatureData).length > 0) {
      // before uploading to firebase, check the schoold again
      if(this.schoolId !== null && this.schoolId !== undefined) {
        try {
          // upload data to firebase
          console.log('School name: ' + (this.state.schoolData.schooleList.find((i) => i.value === this.schoolId)).label + '\n' + JSON.stringify(this.state.temperatureData));
          // start uploading
          const doc = firestore.collection("temperature-collector-temperature-data").doc(this.schoolId);
          const docSnapShot = await doc.get();
          if(docSnapShot.exists) {
            const dates = Object.keys(this.state.temperatureData);
            const temperatureData = {}
            for(let i = 0; i < dates.length; i++) {
              const date = dates[i];
              let temperatureDataOfDate = docSnapShot.get(date);
              if(temperatureDataOfDate) {
                // if the temperatureDataOfDate is not array, then convert to an array
                if(!Array.isArray(temperatureDataOfDate)) {
                  temperatureDataOfDate = [this.state.temperatureData[date]];
                } else {
                  temperatureDataOfDate.push(this.state.temperatureData[date]);
                }
              } else {
                temperatureDataOfDate = [this.state.temperatureData[date]];
              }
              temperatureData[date] = temperatureDataOfDate;
            }
            await doc.update(temperatureData);
          } else {
            // convert to array
            Object.keys(this.state.temperatureData).forEach(date => {
              this.state.temperatureData[date] = [this.state.temperatureData[date]];
            });
            await doc.set(this.state.temperatureData);
          }

          // uploaded
          this.setState({
            uploadDataState:{
              uploaded: true,
              uploading: false
            }
          });
        } catch(e) {
          console.log(e);
          window.alert("Cannot upload data to our server, please try again");
          window.location.reload();
        }
      } else {
        window.alert("No school selected, please try again");
        window.location.reload();
      }
    } else {
      window.alert("No temperature data from the selected starting date: " + this.startDate + ", please try again");
      window.location.reload();
    }
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

  onDateChange = (event) => {
    this.startDate = event.target.value;
    console.log(this.startDate);
    if(this.startDate) {
      if(this.state.activeStep === 0) {
        this.handleNext();
      }
    }
  }

  onSchoolChange = (event) => {
    this.schoolId = event.target.value;
    console.log(this.schoolId);
    if(this.schoolId !== null && this.schoolId !== undefined) {
      if(this.state.activeStep === 1) {
        this.handleNext();
      }
    }
  }

  onConnectButtonClick = async () => {
    if(!this.state.serial) {
      try {
        const serial = await connectMicrobit();
        if(serial) {
          this.setState({
            serial
          });
          if(this.state.activeStep === 2) {
            this.handleNext();
          }
          this.readLoop();
        } else {
          window.alert("Your browser does not support this function, please use desktop Chrome or Edge");
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  state = {
    activeStep: 0,
    schoolData: {
      loadingSchooleList: false,
      schooleList: []
    },
    serial: null,
    uploadDataState: {
      uploading: false,
      uploaded: false
    },
    temperatureData: {}
  }
  steps = () => [
    {
      label: 'Start date of temperature recording',
      content: <>
      <Typography className='UploadDataPage-content-step-text'>
        Please select on which date you started recording the temperature:
      </Typography>
        <TextField
          id="date"
          label="Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onDateChange}
          className='UploadDataPage-content-step-action'
        />
      </>
    },
    {
      label: 'Where you record the temperature',
      content: <>
      <Typography className='UploadDataPage-content-step-text'>
        Please select where you recorded the temperature:
      </Typography>
        <TextField
        id="school"
        select
        onChange={this.onSchoolChange}
        label="Please select your school"
        className='UploadDataPage-content-step-action'
      >
        {this.state.schoolData.schooleList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </>,
    },
    {
      label: 'Connect your Micro:bit to computer',
      content : <>
        <Typography className='UploadDataPage-content-step-text'>
          Please connect your Micro:bit to computer, and click the connect button below:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={this.state.serial ? <LinkIcon/> : <LinkOffIcon />}
          onClick={this.onConnectButtonClick}
          style={this.state.serial ? { backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'} : null}
          className='UploadDataPage-content-step-action'
        >
          {this.state.serial ? 'Connected' : 'Connect'}
        </Button>
      </>,
    },
    {
      label: 'Upload Data',
      content : <>
      <Typography className='UploadDataPage-content-step-text'>
        { this.state.uploadDataState.uploading ? 'Uploading Data' : this.state.uploadDataState.uploaded ? <>Your temperature data is uploaded! <CheckCircleIcon style={{ color: green[500] }}/></> : 'Now you can press the button "A" on your Micro:bit to upload the data' }
      </Typography>
      { this.state.uploadDataState.uploading ? <CircularProgress color="secondary" /> : this.state.uploadDataState.uploade ? null : null }
    </>
    }
  ]

  render() {
      return  <StylesProvider injectFirst>
          <Header />
          <div className="UploadDataPage-banner">
              <h1 className="UploadDataPage-banner__title">Upload Your Data</h1>
          </div>
          <div className='UploadDataPage'>
              <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<ColorlibConnector />}>
                  {this.steps().map(({label}) => (
                  <Step key={label}>
                      <StepLabel StepIconComponent={ColorlibStepIcon}>
                        <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{label}</span>
                      </StepLabel>
                  </Step>
                  ))}
              </Stepper>
              
              <Grid container className="UploadDataPage-content" spacing={2}>
                {this.steps().map(({ content }, step) => (
                  <Grid key={step} className="UploadDataPage-content-step" item xs={3}>
                    {this.state.activeStep >= step ? content : null}
                  </Grid>
                ))}
              </Grid>
              
          </div>
          <Footer />
          <ScrollTop />
      </StylesProvider>
  }
}

export default UploadDataPage