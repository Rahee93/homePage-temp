import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
// firebase configuration setup
var firebaseConfig = {
  // apiKey: "AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80",
  // authDomain: "microbit-terry-fox-90137.firebaseapp.com",
  // projectId: "microbit-terry-fox-90137",
  // storageBucket: "microbit-terry-fox-90137.appspot.com",
  // messagingSenderId: "665322780336",
  // appId: "1:665322780336:web:0831ce49aa55f679ab2d75",
  // measurementId: "G-Q0852EYDHP",

  // the temperature collcotr old firebase
  apiKey: "AIzaSyDZD2IcDJn3aZ7v3CJ4HDh1_NRpPGcV8f8",
  authDomain: "microbitdatavisualization.firebaseapp.com",
  databaseURL: "https://microbitdatavisualization-default-rtdb.firebaseio.com",
  projectId: "microbitdatavisualization",
  storageBucket: "microbitdatavisualization.appspot.com",
  messagingSenderId: "148549104317",
  appId: "1:148549104317:web:15c889eac8c44cca41bdd4",
  measurementId: "G-26GSC30JQ9"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const database = firebase.database();

export const convertCollectionsSnapshotToMap = (collections) => {
  let transformedCollection = [];
  collections.docs.forEach((doc) => transformedCollection.push(doc.data()));
  return transformedCollection;
};

export default firebase;
