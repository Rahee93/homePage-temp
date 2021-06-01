    // This function gets location data to the database
function setMarkers(){
    // Array to store our list of schools. We will loop through it to set markers.
    schools = [];
    // Create an instance of the database for use later. 
    var data = firebase.database()
    // Create a reference to the locations tree in our DB. We can use this to set our school markers
    var locationRef = firebase.database().ref("locations/")
    // The on() method takes an event type and returns a callback method with a data snapshot. It will return any value in this case
    locationRef.on("value", function(data) {
    // Keeping a key reference for later.
        var key = data.key;
    // Set the value of the snapshot we return.
        const report = data.val();
    // We can get the postal code and address, and put them into variables for the marker. (Postal may be wrong...)
        const postal = report.postal_code;
        const address = report.address;
    // Store the postal code and address into an array.   
        var marker = [postal, address];
    // Push the array into a marker
        markers.push( marker )

    });
    // Initialize the marker object.
    initialize(markers);
}

function readMicrobit(){
//TODO #84
}