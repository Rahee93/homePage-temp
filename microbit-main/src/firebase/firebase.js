import firebase from "firebase/app";
import "firebase/firestore";

// firebase configuration setup
var firebaseConfig = {
  apiKey: "AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80",
  authDomain: "microbit-terry-fox-90137.firebaseapp.com",
  projectId: "microbit-terry-fox-90137",
  storageBucket: "microbit-terry-fox-90137.appspot.com",
  messagingSenderId: "665322780336",
  appId: "1:665322780336:web:0831ce49aa55f679ab2d75",
  measurementId: "G-Q0852EYDHP",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const convertCollectionsSnapshotToMap = (collections) => {
  let transformedCollection = [];
  collections.docs.forEach((doc) => transformedCollection.push(doc.data()));
  return transformedCollection;
};

export default firebase;
