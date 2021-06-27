/**
 * @author Pinshu Yang
 * @date January 29, 2021
 * @description Web application that takes data (steps counter) from user's
 * microbit via WEB USB and plotting result on map
 */

/**
 * This MicrobitSyncPage.js file allows users to use WEB USB feature to
 * upload data from microbit to firebase by clicking UPLOAD button.
 */

import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Button from "@material-ui/core/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { firestore } from "../../firebase/firebase";

import "./MicrobitSyncPage.scss";

let lineReader = null;

async function readLoop() {
  let currentTime = firebase.firestore.Timestamp.now().toDate();
  console.log(firebase.firestore.Timestamp.now().toDate());

  while (true) {
    const { value, done } = await lineReader.read();
    console.log(done);
    if (
      value &&
      value.startsWith("steps") &&
      parseInt(value.substring(value.indexOf(":") + 1))
    ) {
      console.log(value);
      const db = firestore.collection("kmCounter");
      db.add({
        counter: parseInt(value.substring(value.indexOf(":") + 1)) * 0.0008,
        timeStamp: currentTime,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          window.alert("Upload data successfully on " + currentTime.toString());
        })
        .catch((error) => {
          window.location.replace("404/server");
        });
    }
    if (done) {
      console.log("[readLoop] DONE", done);
      lineReader.releaseLock();
      break;
    }
  }
}

class LineBreakTransformer {
  constructor() {
    this.container = "";
  }

  transform(chunk, controller) {
    this.container += chunk;
    const lines = this.container.split("\r\n");
    this.container = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.container);
  }
}

const MicrobitSyncPage = () => {
  const onUpload = async () => {
    let port;
    try {
      port = await window.navigator.serial.requestPort();
      // - Wait for the port to open.
      await port.open({ baudRate: 115200 });
      lineReader = port.readable
        .pipeThrough(new window.TextDecoderStream())
        .pipeThrough(new window.TransformStream(new LineBreakTransformer()))
        .getReader();

      readLoop();
    } catch (error) {
      window.location.replace("404/errorpage");
    }
  };
  return (
    <div className="MicrobitSyncPage">
      <Header />
      <div className="MicrobitSyncPage-banner">
        <h1 className="MicrobitSyncPage-banner__title">Microbit Sync</h1>
      </div>
      <div className="MicrobitSyncPage-content">
        <div className="container">
          <h3 className="mb-4">Steps to Upload Microbit Data to our Server</h3>
          <p className="text-danger">
            {" "}
            Your device (micro:bit) MUST be running our version of code to be
            able to send data to the marathon.
          </p>
          <p> 1. Connect your microbit to computer through USB cable.</p>
          <p>
            {" "}
            2. Click "UPLOAD" button below, choose the serial device shows on
            the pop up window, and click CONNECT.
          </p>
          <Button variant="contained" color="primary" onClick={onUpload}>
            Upload Data
          </Button>
          <p>
            {" "}
            Note: Please DON'T CLICK CANCEL button during paring mode, this can
            cause interrupted connection.
          </p>
          <p> 3. Press button A on the microbit</p>
          <p>
            {" "}
            4. If you update data successfully, you will see a pop up message,
            and your data will show up on the Latest Map Page.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MicrobitSyncPage;
