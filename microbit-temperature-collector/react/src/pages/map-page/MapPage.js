import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Header from "../../components/header/Header";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import InfoDialog from './ColorsDialog';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { firestore } from "../../firebase/firebase";
const defaultZoom = 12;
const OTTAWA_CENTER = { lat: 45.4215, lng: -75.6972 };

class MapPage extends Component {

  state = {
    currentSelectedSchoolId: '',
    mapHeight: 0,
    schoolData: {
      loadingSchooleList: false,
      schooleList: []
    },
    temperatureData: {
      loadingTemperatureData: false,
      temperatureDataBySchool: []
    },
    colorBlindMode: false,
    infoDialogOpen: false
  }

  fetchData = async () => {
    // loading the school list
    this.setState({
      schoolData: {
        ...this.state.schoolData,
        loadingSchooleList: true
      }
    });

    // TODO store the schoolListSnapshot so do not need to fetch every time
    const schoolListSnapshot = await firestore
      .collection("temperature-collector-school-list")
      .orderBy("School_Name", "asc")
      .get();

    const schooleList = {};
    schoolListSnapshot.forEach((doc) => {
      schooleList[doc.id] = doc.data()
    });
    this.setState({
      schoolData: {
        schooleList,
        loadingSchooleList: false
      }
    });

    // load temperature data
    this.setState({
      temperatureData: {
        ...this.state.temperatureData,
        loadingTemperatureData: true
      }
    });

    const temperatureDataSnapshot = await firestore
      .collection("temperature-collector-temperature-data")
      .get();

    const temperatureDataBySchool = {};
    temperatureDataSnapshot.forEach((doc) => {
      temperatureDataBySchool[doc.id] = doc.data()
    });

    this.setState({
      temperatureData: {
        temperatureDataBySchool,
        loadingSchooleList: false
      }
    });
  }

  componentWillUnmount() {
    this.clearSchoolMarkers();
  }

  componentDidMount() {
    this.fetchData();
    this.updateMapHeight();
    window.addEventListener('resize', this.updateMapHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.schoolData.schooleList.length !== prevState.schoolData.schooleList.length) {
      // need to wait map to load
      if (this.map && this.maps) {
        this.schoolsToMarkers();
        this.panToOttawaCenter();
      }
    } else if (this.state.currentSelectedSchoolId !== prevState.currentSelectedSchoolId) {
      if (this.map) {
        // before select a new school, unselect pre selected school
        this.unSelectSchool(prevState.currentSelectedSchoolId);
        this.selectSchool(this.state.currentSelectedSchoolId);
      }
    }
  }

  updateMapHeight = () => {
    if (window.innerHeight && window.innerHeight > 0) {
      const newMapHeight = window.innerHeight - 200;
      if (newMapHeight !== this.state.mapHeight) {
        this.setState({
          mapHeight: newMapHeight,
        });
      }
    }
  };

  onSelectedSchoolChange = newSelectedSchoolId => {
    this.setState({
      currentSelectedSchoolId: newSelectedSchoolId
    });
  };

  handleApiLoaded = (map, maps) => {
    this.map = map;
    this.maps = maps;
    this.schoolsToMarkers();
  };

  clearSchoolMarkers = () => {
    if (this.schoolMarkers && Object.keys(this.schoolMarkers).length > 0) {
      Object.keys(this.schoolMarkers).forEach(schoolId => {
        this.schoolMarkers[schoolId].markerListeners.forEach(listener => listener.remove());
        this.schoolMarkers[schoolId].marker.setMap(null);
        delete this.schoolMarkers[schoolId];
      });
    }
    this.schoolMarkers = null;
  }

  panToOttawaCenter = () => {
    this.map.setZoom(defaultZoom);
    this.map.panTo(OTTAWA_CENTER);
  }

  getColorByTemperature = (temeprature) => {

  }
  schoolsToMarkers = () => {
    // clear exsiting markers
    this.clearSchoolMarkers();

    this.schoolMarkers = {};
    const schools = this.state.schoolData.schooleList;
    if (schools) {
      Object.keys(schools).forEach(schoolId => {
        const school = schools[schoolId];
        const position = { lat: school.lat, lng: school.lng };
        const marker = new this.maps.Marker({
          opacity: 0.8,
          position,
          title: school.School_Name,
          map: this.map,
        });
        const markerListeners = [];
        markerListeners.push(
          marker.addListener('click', () => {
            this.onSelectedSchoolChange(schoolId);
          }),
        );

        //Creates Circle objects to display on the map in locations found in database.
        //Using min and max to determine the colour of the circle with getCircleColour()
        // new google.maps.Circle({
        //   strokeColor: getColorByTemperature(citymap[city].minTemp),
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: getColorByTemperature(citymap[city].minTemp),
        //   fillOpacity: 0.35,
        //   map,
        //   center: citymap[city].location,
        //   radius: 200,
        // })

        // new google.maps.Circle({
        //     strokeColor: getColorByTemperature(citymap[city].maxTemp),
        //     strokeOpacity: 0.8,
        //     strokeWeight: 2,
        //     fillColor: getColorByTemperature(citymap[city].maxTemp),
        //     fillOpacity: 0.35,
        //     map,
        //     center: citymap[city].location,
        //     radius: 250,
        // })

        this.schoolMarkers[schoolId] = {
          position,
          marker,
          markerListeners,
        };
      });
    }
  }

  unSelectSchool = (schoolId) => {
    // unselected style
    if (this.schoolMarkers[schoolId]) {
      const { marker } = this.schoolMarkers[schoolId];
      marker.setOpacity(0.8);
      marker.setZIndex();
    }
  }

  selectSchool = (schoolId) => {
    if (this.schoolMarkers[schoolId]) {
      const { marker, position } = this.schoolMarkers[schoolId];
      const SELECTION_ZOOM = 15;
      if (this.map.getZoom() < SELECTION_ZOOM) {
        this.map.setZoom(SELECTION_ZOOM);
      }
      this.map.panTo(position);
      // selected style
      marker.setOpacity(1);
      marker.setZIndex(this.maps.Marker.MAX_ZINDEX);
    }
  }

  openInfoDialog = (open) => {
    this.setState({
      infoDialogOpen: open
    })
  }

  
  render() {
    return (
      <StylesProvider injectFirst>
        <Header />
        <div style={{padding: '0 50px', display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
          <Autocomplete
            value={this.state.currentSelectedSchoolId}
            getOptionSelected={(option, value) => option.value === value}
            onChange={(event, newSelectedSchool) => {
              if(newSelectedSchool) {
                this.onSelectedSchoolChange(newSelectedSchool.value);
              } else {
                this.onSelectedSchoolChange('');
              }
            }}
            id="school"
            options={Object.keys(this.state.schoolData.schooleList).map((schoolId) => ({value: schoolId, label: this.state.schoolData.schooleList[schoolId].School_Name}))}
            getOptionLabel={(option) => option && option.label ? option.label : ''}
            style={{width: '50%' }}
            renderInput={(params) => <TextField {...params} label="School" variant="outlined" margin="normal" />}
          />
          <IconButton color="primary" aria-label="Info" onClick = {() => this.openInfoDialog(true)}>
            <ColorLensIcon />
          </IconButton>
        </div>
        <div style={{ height: `${this.state.mapHeight}px`, padding: '0 50px', width: '100%' }}>
          <GoogleMapReact
            defaultZoom={defaultZoom}
            defaultCenter={OTTAWA_CENTER}
            bootstrapURLKeys={{ key: 'AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80'/*'AIzaSyC1gDnhhIAkrOF5abBFwo1ysfwjSxHJBag'*/ }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          ></GoogleMapReact>
        </div>
        <InfoDialog
          open={this.state.infoDialogOpen}
          onClose={() => this.openInfoDialog(false)}
          colorBlindMode={this.state.colorBlindMode}
          toggleColorBlidMode={() => {
            this.setState({
              colorBlindMode: !this.state.colorBlindMode
            });
          }}
        />
      </StylesProvider>
    );
  }
}

export default MapPage;
