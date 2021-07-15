import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {firestore} from '../../firebase/firebase.js';

const dates = [];
const temps = [];
var entry;
const tempsRef = firestore.collection('temperature-collector-temperature-data');
const sortJson = require('sort-keys');
const options = {ignoreCase: true, reverse: false, depth: 1};
const school_ID = '566'; 


tempsRef.doc(school_ID).get().then((snapshot) => {
  var temperaturesForSchool = snapshot.data();
  const sortedEntry = sortJson(temperaturesForSchool, options); 
  for (const date in sortedEntry) {
    console.log(date, sortedEntry[date][0])
    dates.push(date)
    //grabs any nested temps if collected on same day and averages them
    var summedTemps = 0;
    var avgTemp= 0; 
    var counter = 0;
    for (var temp in sortedEntry[date]){ 
        summedTemps += sortedEntry[date][temp];
        counter += 1;
        //temps.push(entry[date][temp])  
    }
    avgTemp = Math.round((summedTemps / counter) * 100) / 100;
    temps.push(avgTemp);
}
});  

/*
//average of all schools and day
tempsRef.get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        entry = doc.data();
        const sortedEntry = sortJson(entry, options); 

        console.log('Doc data:', sortedEntry)
    
        for (const date in sortedEntry) {
            console.log(date, sortedEntry[date][0])
            dates.push(date)
            //grabs any nested temps if collected on same day
            var summedTemps = 0;
            var avgTemp= 0; 
            var counter = 0;
            for (var temp in sortedEntry[date]){ 
                summedTemps += sortedEntry[date][temp];
                counter += 1;
                //temps.push(entry[date][temp])  
            }
            avgTemp = Math.round((summedTemps / counter) * 100) / 100;
            temps.push(avgTemp);
        }
    });

});
*/

const state = {
  labels: dates,
  datasets: [
    {
      label: 'Temperature',
      fill: true,
      lineTension: .25,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: temps
    }
  ]
}

export default class AvgTempLineChart extends Component {
  render() {
    return (
      <div>
        <Line
          className="average-temp-chart"
          data={state}
          options={{
            title:{
              display:true,
              text:'Temperatures',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}