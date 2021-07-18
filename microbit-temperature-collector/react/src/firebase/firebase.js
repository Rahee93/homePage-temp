import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
// firebase configuration setup
var firebaseConfig = {
  apiKey: "AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80",
  authDomain: "microbit-terry-fox-90137.firebaseapp.com",
  projectId: "microbit-terry-fox-90137",
  storageBucket: "microbit-terry-fox-90137.appspot.com",
  messagingSenderId: "665322780336",
  appId: "1:665322780336:web:0831ce49aa55f679ab2d75",
  measurementId: "G-Q0852EYDHP",

  // the temperature collcotr old firebase
  // apiKey: "AIzaSyDZD2IcDJn3aZ7v3CJ4HDh1_NRpPGcV8f8",
  // authDomain: "microbitdatavisualization.firebaseapp.com",
  // databaseURL: "https://microbitdatavisualization-default-rtdb.firebaseio.com",
  // projectId: "microbitdatavisualization",
  // storageBucket: "microbitdatavisualization.appspot.com",
  // messagingSenderId: "148549104317",
  // appId: "1:148549104317:web:15c889eac8c44cca41bdd4",
  // measurementId: "G-26GSC30JQ9"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const loadSchoolList = async () => {
  try {
    const locaData = getDataFromLocal('schoolListData', true);
    if(locaData) {
      return locaData;
    } else {
      const schoolListData = {};
      const schoolListSnapshot = await firestore
        .collection("temperature-collector-school-list")
        .orderBy("School_Name", "asc")
        .get();
  
      schoolListSnapshot.forEach((doc) => {
        schoolListData[doc.id] = doc.data();
      });
      // store schoolListData to local storage because it will not change frequently
      saveDataToLocal('schoolListData', schoolListData, true);
      return schoolListData;
    }
  } catch(error) {
    console.error(error);
    return {};
  }
}

export const loadTemperatureData= async () => {
  try {
    const locaData = getDataFromLocal('temperatureData', false);
    if(locaData) {
      return locaData;
    } else {
      const temperatureData = {};
      const temperatureDataSnapshot = await firestore
        .collection("temperature-collector-temperature-data")
        .get();

      temperatureDataSnapshot.forEach((doc) => {
        temperatureData[doc.id] = doc.data();
      });
      // do not store temperatureData to local storage because it will change frequently
      saveDataToLocal('temperatureData', temperatureData, false);
      return temperatureData;
    }
  } catch(error) {
    console.error(error);
    return {};
  }
}

const getDataFromLocal = (key, useLocalStorage) => {
  if(useLocalStorage && window.localStorage && window.localStorage.getItem(key)) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  if(window.sessionStorage && window.sessionStorage.getItem(key)) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
  if(window.top && window.top[key]) {
    return window.top[key];
  }
  return null;
}

const saveDataToLocal = (key, value, useLocalStorage) => {
  if(useLocalStorage && window.localStorage) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return;
    } catch(error) {
      console.error(error);
    }
  }
  if(window.sessionStorage) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return;
    } catch(error) {
      console.error(error);
    }
  }
  if(window.top) {
    window.top[key] = value;
    return;
  }
}
export default firebase;
