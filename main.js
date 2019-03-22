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
var totalRuns = 0;

// capture button-click

$("#submit").on("click", function(){
    event.preventDefault(); 
    name = $("#name-input").val();
    town = $("#town-input").val();
    firstTime = $("#time-input").val();
    frequency = $("#often-input").val();
    totalRuns = $("#runs-input").val();

    if(name != ""){
        database.ref().push({
            name: name,
            destination: town,
            firstTime: firstTime,
            frequency: frequency,
            totalRuns: totalRuns
        });
        // clear input fields
        $("#name-input").val("");
        $("#town-input").val("");
        $("#time-input").val("");
        $("#often-input").val("");
        $("#runs-input").val("");
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
    totalRuns = childSnapshot.val().totalRuns;
    var cFirstTime = moment(firstTime, "HHmm");
    var diffNow = moment().diff(cFirstTime,"minutes");
    console.log(diffNow);
    var minAway;
    var nextTime;
    var cLastTime = cFirstTime.add(frequency*(totalRuns-1), "minutes");
    // the line above will also change the val of cFirstTime !!!
    console.log(cLastTime.format("HH:mm"));
    // if time now is between first and last
    if(moment().diff(moment(firstTime,"HHmm"))>0 && Math.floor(moment().diff(cFirstTime,"minutes")/frequency)<totalRuns){
        minAway =  frequency - diffNow % frequency;
        nextTime = moment().add(minAway, "minutes").format("HH:mm");
        // if time now is earlier than first
    }else if(moment().diff(moment(firstTime,"HHmm"), "minutes")<=0){
        nextTime = moment(firstTime, "HHmm").format("HH:mm");
        minAway = moment(firstTime, "HHmm").diff(moment(), "minutes");
        // if time now is later than first but earlier than last (next day)
    }else{
        nextTime = moment(firstTime, "HHmm").format("HH:mm");
        minAway = moment("2400", "HHmm").diff(moment(), "minutes") + moment(firstTime, "HHmm").diff(moment("0000", "HHmm") ,"minutes")
    }
    

    // write to html
    var newRow = $("<tr>");
    var trainName = $("<td>").text(name);
    var desti = $("<td>").text(town);
    var firstTrain = $("<td>").text(firstTime);
    var often = $("<td>").text(frequency);
    var first = $("<td>").text(moment(firstTime, "HHmm").format("HH:mm"));
    console.log(cFirstTime.format("HH:mm"));
    var last = $("<td>").text(cLastTime.format("HH:mm"));
    var nextArrival = $("<td>");
    var timeAway = $("<td>");

    newRow.append(trainName, desti, first, last, often, nextArrival, timeAway);
    $("tbody").prepend(newRow);

    nextArrival.text(nextTime);
    timeAway.text(minAway);
    // setInterval(function(){
    //     console.log(minAway);
    //     console.log("wait");
    // }, 5000);
})
