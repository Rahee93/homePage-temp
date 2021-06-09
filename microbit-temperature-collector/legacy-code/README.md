# CST8334

# Micro:Bit Temperature Collector

A Micro:Bit project developed by 4th Semester students at Algonquin College. This is a web application designed to be used with the BBC MicroBit, a microcomputer designed with educational purposes in mind. Our project is designed to use temperature data collected by the MicroBit to plot the differences between locations on a provided map. 

### Prerequisites
To collect temperature data:
A BBC MicroBit, available at https://www.microbit.org/ or other retailers.

A microUSB cable that is suitable for data transfer. Note that one comes with the MicroBit kit which is suotable for this purpose. 

The customized temperature collection script created by our team, which is embedded on the project website on the instructions page. 

If left outside, we reccommend a secure box or case to protect against adverse weather conditions. 

To upload data:
* A MicroBit which has a temperature collection file on it.
* A microUSB cable that is suitable for data transfer.
* A valid location selected via map. For privacy reasons, we have restricted upload locations to schools.

## Instructions

Once you have recived the MicroBit, there are preparation steps that must be undertaken to get it collecting data. As the MicroBit is a simple microcomputer, it does not have any way to store files as a tablet or laptop would. To make it work, we will need to _flash_ (a primitive type of installation) a custom script to the device before we begin. MicroBit uses a customized version of Python called MicroPython to recieve instructions and execute commands. Note that the MicroBit must be connected via micro-usb cable to do this, and the transfer itself must be done on the official MicroPython editor. There are instructions to install the program on any MicroBit device on the project website on our instructions page. Once it is installed, simply press the B button on the device to begin temperature recording, and take note of the date you began this recording. The custom script we have created will calculate temperature averages since you began the recording at upload time

When you are ready to upload temperature data, the application will walk you through the upload process. You will need to input the date that you began the recording, and then select the loaction to upload data to on the map and press Button A on the device. The upload will then generate an inner and outer heatmap that will vary based on the data uploaded by the user community.


### Installing & Use
Once the MicroBit has been flashed, the temperature logger will be running after Button B is pressed. There is no need to do anything else except leave it in a safe place. It retains the data even if the batteries run out or if the power is disconnected, although it won't generate any new data after this. 
The device retains the following functions from the Microbit Max-Min logger:
* Shake the device to show the current temperature.
* Press button A when prompted to upload data to the selected school.
* Press button B to begin recording (when prompted on the site)

## Firebase Administration
The project uses Google's Firebase realtime database technology to update the map abnd store new temperature objects from the MicroBit. Access to the project back-end is done through your Google account at the following [link]() - https://console.firebase.google.com/u/0/project/microbitdatavisualization/database/microbitdatavisualization-default-rtdb/data

If you are not administering this application, you may safely ignore this section.

Given the nature of the app, Firebase may require some cleanup or administration. You may do so at the link above by clicking "Realtime Database".

If the map data is not displaying properly, or there is some issue with uploads by users, you may reset any time by clicking on "Realtime Database", clicking the three dots in the top right, and clicking "import JSON". Please make sure that the location you upload to is the root of the database, which can be accessed by clicking on the database name: microbitdatavisualization-default-rtdb

You may use the file "MicrobitVisualizerDataBackup.json" to reset the backend to an initial state. 

While it is possible to edit specific data under the nodes or add new schools, it is encouraged to do so using the backup JSON file. Simply open it in a text editor and add the data to the structure by copying another node and adding the new data, including the latitude and longitude. Then, you may import the file and the new object will be created.

For more information on Firebase Realtime Database, please consult the documentation at:
https://firebase.google.com/docs?authuser=0


## Built With

* [MicroBit Max-Min Temperature Logger]() - https://www.microbit.org/projects/make-it-code-it/maxmin-temperature-logger/
* [MicroPy]() - Micropython
* [MicroFS]()- File system tool for MicroBit
* [Firebase]() - Google's Firebase API and tools
* [Google Maps]() - Google maps' API
* [JavaScript]() - Javascript
* [WebUSB]() - Connectivity via browser using WebUSB.
* [Github]() - Team collaboration and tasks.
* [Zenhub]() - Task tracking

## Authors

* **Team Beaver** 
James Enright, Thi Kim Anh Huynh, Jun Liu, Ben Mazereeuw,  Jashanjot Singh Pruthi, Fangfang Wu 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Angela Giddings, our project advisor at Algonquin College
* Members and collaborators of our development group
* Andrew McDonald, who approached Algonquin with the original idea for the application.