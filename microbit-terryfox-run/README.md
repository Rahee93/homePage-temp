# CST8334 Team 7 - Winter 2021

## Micro:bit - The Terry Fox Run

A web application that visualize data based on the accelerometer of the [micro:bit](https://microbit.org/). This web application allows a group of micro:bit users to add their steps together and display their results in the web application that shows The Terry Fox Route.

## Programming Language

The implementation was written in MicroPython and Javascript.

## How it works

Individuals with a [micro:bit](https://microbit.org) can register an account to send data relating to how many steps they have walked. This data comes from the built-in motion detector of the micro:bit. The device uses the ‘shake’ gesture to count steps and collect numerical acceleration data. 

Participants can update their lastest steps by logging into the website again and uploading more data. The device has a total step counter, but the app will calculate the difference and add the net increase in steps to the user's total as needed.

The web app will calculate the accumulated steps based on these collaborative efforts of participants, and plot the result on a map. The app displays the Terry Fox Marathon route. When users run the Terry Fox Marathon together with their microbits, they can collaboratively count the steps they have each ran.

## What you'll need
* A micro:bit
* A battery pack
* Visit our website: https://terry-fox-kids.netlify.app/
* Recommended Web Browser: at least Chrome os 89


## directory layout

    .
    ├── build                   # Compiled files 
    ├── node_modules            # Store all package installed by NodeJS
    ├── public                  # Store all staic documents, including pictures. 
    ├── src                     # Source files                  
    ├── LICENSE
    └── README.md

## Instruction of the website

* Home: briefly introduce what our website is, including a simple description of TerryFox with an interactive map.
* Get Started: Explain all the steps to how use our website to count your steps and upload data to contribute your steps in Terry Fox's Marathon.
* Latest Map: Indicate all of killometer we collected and how far we walked on the map of Terry Fox's Marathon.
* Micro:Bit Sync: The interface to upload the data, including details instruction.
* Gallery: Participants show their photos.
* Contact Us: List the information that you can contact our team.

## Instruction of Installation
There is no need to install any desk application or third party application to support this project.
________________________________________
|                                       |
|To use the website to count the steps: |
|_______________________________________|

* Step1: Download the .hex step counter program clicking the download button on page "Get Started".
* Step2: Save the .hex file in Microbit director. 
( Notice: you may not find the file once the download is finished, this is caused by microbit setting. After the .hex file dowload, you can press button A to check if the program on microbit working well. After press button A, there will be a check mark shows on microbit. From here, the step counter is started.)
* Step3: Save your step counter data.
After you finish counting the step, press button B on microbit board to save the data. "Saved" message will be shown on microbit.

To use the website to upload your data:
________________________________________
|                                       |
|To use the website to upload your data:|
|_______________________________________|

(Notice: the whole process need to keep the battery connect to microbit!)
* Step1: connect microbit to computer by using USB connect.
* Step2: Open web page "Micro:bit Sync", and click button "upload".
(Notice: after clicking button, the pop up window suppose to list the serial port of Microbit, if there is no device shows, please check the connection, or reconnect the microbit to computer.)
* Step3: In the pop up window, click the device, and click button "connect". 
( Now our website is waiting for recieving message from microbit)
* Step4: Press button B on microbit. 
( This is sending message to the computer)
There should be a message to show data upload successfully with the time you upload.
* Step5: Go to web page "Latest Map" to check how many killometer you contributed in Terry Fox's Marrason.
