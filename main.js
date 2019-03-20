// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtxce8o2WM9FwAeyx2WUbDUnl1ULgzcx0",
    authDomain: "train-time-7b273.firebaseapp.com",
    databaseURL: "https://train-time-7b273.firebaseio.com",
    projectId: "train-time-7b273",
    storageBucket: "train-time-7b273.appspot.com",
    messagingSenderId: "641378608638"
  };
  firebase.initializeApp(config);

// create a variable to reference the database
var database = firebase.database();

// initial values
var name = "";
var town = "";
var firstTime = 0;
var frequency = 0;

// capture button-click

$("#submit").on("click", function(){
    event.preventDefault(); 
    name = $("#name-input").val();
    town = $("#town-input").val();
    firstTime = $("#time-input").val();
    frequency = $("#often-input").val();

    if(name != ""){
        database.ref().push({
            name: name,
            destination: town,
            firstTime: firstTime,
            frequency: frequency
        });
        // clear input fields
        $("#name-input").val("");
        $("#town-input").val("");
        $("#time-input").val("");
        $("#often-input").val("");
    }else{
        alert("Train name cannot be empty!");
    }
})

// firebase watcher

database.ref().on("child_added", function(childSnapshot){
    name = childSnapshot.val().name;
    console.log(name);
    town = childSnapshot.val().destination;
    firstTime = childSnapshot.val().firstTime;
    console.log(firstTime);
    frequency = childSnapshot.val().frequency;

    // write to html
    var newRow = $("<tr>");
    var trainName = $("<td>").text(name);
    var desti = $("<td>").text(town);
    var often = $("<td>").text(frequency);
    // var cFirstTime = moment(firstTime)
    var nextArrival = $("<td>").text("--");
    var timeAway = $("<td>").text("--");
    newRow.append(trainName, desti, often, nextArrival, timeAway);
    $("tbody").prepend(newRow);
})
