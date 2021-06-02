/**
 * @author  THANH HUE, PHAM
 * @date January 29, 2021
 * @description Web application that takes data (steps counter) from user's
 * microbit via WEB USB and plotting result on map
 */

/**
 * This Map.js file contains the map configuration and calculation
 */

import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.scss";
import avatar from "../../assets/photo/avatar.png";
import { mapData } from "../../assets/data/mapData";
var turf = require("@turf/turf");

mapboxgl.accessToken = process.env.MAP_ACCESS_TOKEN;

const Map = ({ counter }) => {
  const mapContainerRef = useRef(null);
  const [state] = useState({
    lng: -71.1390043,
    lat: 46.7957208,
    zoom: 3.7,
  });
  const coordinates = [];
  mapData.forEach((i) => coordinates.push(i.coordinates));

  const route = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates,
        },
      },
    ],
  };

  // initialize map when component mounts
  useEffect(() => {
    var along = turf.along(route.features[0], counter, "kilometers");
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [state.lng, state.lat],
      zoom: state.zoom,
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    var el = document.createElement("div");
    el.className = "marker";
    var marker = {
      type: "Feature",
      properties: {
        message:
          "It’s got to keep going without me. Thank you for participating in my Marathon of Hope",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [-66.324462890625, -16.024695711685304],
      },
    };
    el.style.backgroundImage = `url(${avatar})`;
    el.style.width = marker.properties.iconSize[0] + "px";
    el.style.height = marker.properties.iconSize[1] + "px";
    el.addEventListener("click", function () {
      window.alert(marker.properties.message);
    });

    new mapboxgl.Marker().setLngLat(mapData[0].coordinates).addTo(map);
    new mapboxgl.Marker()
      .setLngLat(mapData[mapData.length - 1].coordinates)
      .addTo(map);
    new mapboxgl.Marker(el).setLngLat(along.geometry.coordinates).addTo(map);

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: route,
      });
      map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 4,
          "line-color": "#FF0000",
        },
      });
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
