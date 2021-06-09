/*
@author Jashanjot Singh Pruthi
@resources
1 Getting started with web serial api - https://codelabs.developers.google.com/codelabs/web-serial#3
2 How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/
 */
let reader;
let inputDone;
let inputStream;
let listTemp= [];
let dateTempDict = {};
let date;
let port;


class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.container = '';
  }

  transform(chunk, controller) {
      // splits up the given chunk in the associated stream
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach(line => controller.enqueue(line));

  }

  flush(controller) {
    controller.enqueue(this.container);

  }
}

async function connectMicrobit() {
    // filter the available devices connected to the computer that match the vendor id of a microbit only
    const filter = {usbVendorId: 0x0d28};
    // Connect to the microbit with user's selected microbit device
    port = await navigator.serial.requestPort({filters: [filter]});
    // opens the port selected with the rate of transfer (baudrate = 115200) as suggested by microbit documentations at https://microbit-micropython.readthedocs.io/en/v1.0.1/uart.html
    await port.open({ baudRate: 115200 });

    // Change the connect button to connected when micronit is connected
    document.getElementById("connect").textContent = "Connected";
    // gets the date from the date field and change its format to only include dd-mm-yyyy
    getDate();

    // Get the readable stream from the opened port and decode it using decoder
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    // pipe the decoded stream into linebreaktransformer to break the incoming stream line by line
    inputStream = decoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer()));

    reader = inputStream.getReader();
    // read from the microbit's incoming stream until the stream gives 5 temperature recordings
    await readLoop();

    // loop through the list of temperatures and store it in a dictionary of 5 dates and its corresponding temperature recording
    for(var temp in listTemp){
        dateTempDict[dateToString(date)] = listTemp[temp];
        date.setDate(date.getDate()+1);
    }
    // prints the collected data on the webpage
    printdateTempTable();

}

async function readLoop(){
    // reads value from the decoded stream and stores it in a list
    let count = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
          count = count+1;
          console.log(value+"\n");
        listTemp.push(value);
      }
      if(count === 5) {
        console.log('[readLoop] DONE');
        reader.releaseLock();
        break;
      }
    }
}

function getDate(){
    // changes the format of the selected date to only include dd, mm and year
        var dt = document.getElementById("myDate").value;
        date = new Date(dt);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate()+1);
}

function dateToString(dt){
    //changes to given date to a string format of yyyy-mm-dd
    var dd = String(dt.getDate()).padStart(2, '0');
    var mm = String(dt.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = dt.getFullYear();

    var string = yyyy + '-' + mm + '-' + dd ;
    return string;
}

function redirectToVisualize(){
    // Redirects to the visualization.html page to upload the data
        localStorage.setItem("dataDict", JSON.stringify(dateTempDict));
     window.location.href = "Visualization.html?dataDict=";
}

function printdateTempTable(){
    // populates the table in the html page to show the collected date vs temperature readings from the microbit
    document.getElementById("data").innerHTML = "Temperature Data Received ";
        let temData= [];
        for (var key in dateTempDict){
            dict = {}
            dict["Date"] = key;
            dict["|"] = "|"
            dict["Average Temperature"] = dateTempDict[key].toString();
            temData.push(dict);
        }

    function generateTableHead(table, data) {
      let thead = table.createTHead();
      let row = thead.insertRow();
      for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }
    }

    function generateTable(table, data) {
      for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
    }

    let table = document.querySelector("table");
    let data = Object.keys(temData[0]);
    generateTable(table, temData);
    generateTableHead(table, data);
}
