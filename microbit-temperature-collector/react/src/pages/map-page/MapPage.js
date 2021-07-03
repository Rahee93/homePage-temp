import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

const defaultZoom = 10;
const OTTAWA_CENTER = { lat: 45.4215, lng: -75.6972 };

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverOverSchool: '',
      mapHeight: 0,
    };
  }

  componentWillUnmount() {
    this.clearOttawaSchoolMarkers();
  }

  componentDidMount() {
    this.updateMapHeight();
    window.addEventListener('resize', this.updateMapHeight);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentCategory !== prevProps.currentCategory) {
      // need to wait map to load
      if (this.map && this.maps) {
        this.schoolsToMarkers();
        this.panToOttawaCenter();
      }
    } else if (this.props.ottawaSchools.length !== prevProps.ottawaSchools.length) {
      // need to wait map to load
      if (this.map && this.maps) {
        this.schoolsToMarkers();
        this.panToOttawaCenter();
      }
    } else if (this.props.currentSelectedSchool.NAME !== prevProps.currentSelectedSchool.NAME) {
      if (this.map) {
        // before select a new school, unselect pre selected school
        this.unSelectSchool(prevProps.currentSelectedSchool.NAME);
        this.selectSchool(this.props.currentSelectedSchool.NAME);
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

  onSelectedSchoolChange = newSelectedSchool => {
    // notify currentSelectedSchool is now newSelectedSchool
    this.props.onSelectedSchoolChange(newSelectedSchool);
  };

  handleApiLoaded = (map, maps) => {
    this.map = map;
    this.maps = maps;
    this.schoolsToMarkers();
  };

  clearOttawaSchoolMarkers() {
    if (this.ottawaSchoolMarkers && Object.keys(this.ottawaSchoolMarkers).length > 0) {
      Object.keys(this.ottawaSchoolMarkers).forEach(name => {
        this.ottawaSchoolMarkers[name].markerListeners.forEach(listener => listener.remove());
        this.ottawaSchoolMarkers[name].marker.setMap(null);
        delete this.ottawaSchoolMarkers[name];
      });
    }
    this.ottawaSchoolMarkers = null;
  }

  panToOttawaCenter() {
    this.map.setZoom(defaultZoom);
    this.map.panTo(OTTAWA_CENTER);
  }

  schoolsToMarkers() {
    // clear exsiting markers
    this.clearOttawaSchoolMarkers();

    this.ottawaSchoolMarkers = {};
    const { ottawaSchools } = this.props;
    if (ottawaSchools) {
      ottawaSchools.forEach(ottawaSchool => {
        const { position, NAME: name, rankInOttawa } = ottawaSchool;
        const marker = new this.maps.Marker({
          opacity: 0.7,
          position,
          label: `${rankInOttawa}`,
          title: name,
          map: this.map,
        });
        const markerListeners = [];
        markerListeners.push(
          marker.addListener('mouseover', () => {
            this.setState({
              hoverOverSchool: name,
            });
          }),
        );
        markerListeners.push(
          marker.addListener('mouseout', () => {
            this.setState({
              hoverOverSchool: '',
            });
          }),
        );
        markerListeners.push(
          marker.addListener('click', () => {
            this.onSelectedSchoolChange(ottawaSchool);
          }),
        );

        this.ottawaSchoolMarkers[name] = {
          position,
          marker,
          markerListeners,
        };
        if (name === this.props.currentSelectedSchool.NAME) {
          this.selectSchool(name);
        }
      });
    }
  }

  unSelectSchool(name) {
    // unselected style
    if (this.ottawaSchoolMarkers[name]) {
      const { marker } = this.ottawaSchoolMarkers[name];
      marker.setOpacity(0.7);
      marker.setZIndex();
    }
  }

  selectSchool(name) {
    if (this.ottawaSchoolMarkers[name]) {
      const { marker, position } = this.ottawaSchoolMarkers[name];
      const SELECTION_ZOOM = 12;
      if (this.map.getZoom() < SELECTION_ZOOM) {
        this.map.setZoom(SELECTION_ZOOM);
      }
      this.map.panTo(position);
      // selected style
      marker.setOpacity(1);
      marker.setZIndex(this.maps.Marker.MAX_ZINDEX);
    }
  }

  render() {
    return (
      <div>
        <div
          id="title"
          style={{
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 6,
            marginRight: 6,
          }}
        >
        </div>
        <div style={{ height: `${this.state.mapHeight}px`, width: '100%' }}>
          <GoogleMapReact
            defaultZoom={defaultZoom}
            defaultCenter={OTTAWA_CENTER}
            bootstrapURLKeys={{ key: 'AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80' }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          ></GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default MapPage;
