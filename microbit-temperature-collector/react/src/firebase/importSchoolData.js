/**
 * This script is to move the school data to the Terry fox firestore
 */
 const fs = require('fs');
 const path = require('path');
 const firebase = require("firebase/app");
 require("firebase/firestore");
 
 var firebaseConfig = {
   apiKey: "AIzaSyCld6JUO9krxRQ-dAic2r2xdMdWMyzjl80",
   authDomain: "microbit-terry-fox-90137.firebaseapp.com",
   projectId: "microbit-terry-fox-90137",
   storageBucket: "microbit-terry-fox-90137.appspot.com",
   messagingSenderId: "665322780336",
   appId: "1:665322780336:web:0831ce49aa55f679ab2d75",
   measurementId: "G-Q0852EYDHP"
 };
 
 firebase.initializeApp(firebaseConfig);
 
 const firestore = firebase.firestore();
 
 const schoolList = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../legacy-code/data/MicrobitVisualizerDataBackup.json'), 'utf8')).locations;
 schoolList.forEach(school => {
   delete school.max_temp;
   delete school.min_temp;
 });
 
 
 const addDataToFireStore = async () => {
   const collectionRef = firestore.collection("temperature-collector-school-list");
   for(let i = 0; i < schoolList.length; i++){
     const school = schoolList[i];
     await collectionRef
       .doc(school.School_Number.toString())
       .set(school);
     console.log("Adding school: " + school.School_Name);
   }
 }
 //addDataToFireStore();
 
 // for test
//  const collectionRef = firestore.collection("temperature-collector-school-list");
//  collectionRef
//        .get()
//        .then((snapshot) => {
//          snapshot.forEach((aDocument) => {console.log(aDocument.get('School_Name'))});
//        });