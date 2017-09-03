  // Initialize Firebase
  var config = 
  {
        apiKey: "AIzaSyCnCUqCzx7j--3X6_r3ymzQZ6uXo666kc4",
    authDomain: "trainactivitybasic.firebaseapp.com",
    databaseURL: "https://trainactivitybasic.firebaseio.com",
    projectId: "trainactivitybasic",
    storageBucket: "trainactivitybasic.appspot.com",
    messagingSenderId: "258285128855"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //Global variables
    var trainName = "";
    var destination="";
    var firstTrainTime = "";
    var frequency = 0;
    var arrivalTime = 0;
    var minutesAway = 0;


    //used in our moment.js formula for calculating (arrivalTime) && (minutesAway)
    var remainder = 0;
    

    //submit button pressed
    $("#searchBtn").on("click", function(event)
    {

      //Don't refresh page
      event.preventDefault();

      //Get inputs from 4 textboxes
      trainName = $(".box1").val().trim();
      destination = $(".box2").val().trim();
      firstTrainTime = $(".box3").val().trim();
      frequency = $(".box4").val().trim();

      //use moment.js to convert firstTrainTime to a suitable format in order for moment.js to work
      var convertedFirstTrainTime = moment(firstTrainTime, 'LT');

      //Use moment js to get (total # minutes) since the (firstTrainTime)
      var minutesSinceFirstTrainTime = moment().diff(convertedFirstTrainTime, 'minutes');

      //Now get remainder of (minutesSinceFirstTrainTime) mod (frequency)
      remainder = parseInt(minutesSinceFirstTrainTime) % frequency;

      //Calculate the (minutes Away) before next train comes
      minutesAway = frequency - remainder;

      //Calculate the exact time (HH:MM am/pm) when the train will arrive
      //This is Saying:       (current Time) + (minutes Away)
      arrivalTime = moment().add(minutesAway, 'minutes').format('LT');

      
      //Store code in the database
      database.ref().push(
      {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        arrivalTime: arrivalTime,
        minutesAway: minutesAway

      });

     





    });


    //Display HTML on page
    database.ref().on("child_added", function(childSnapshot)
    {
      
      $("#full-member-list").append("<tr> <td id='trainName'>" + childSnapshot.val().trainName + "</td>" + 
                                    "     <td id='destination'>" + childSnapshot.val().destination + "</td>" + 
                                    "     <td id='frequency'>" + childSnapshot.val().frequency + "</td>" + 
                                    "     <td id='arrivalTime'>" + childSnapshot.val().arrivalTime + "</td>" + 
                                    "     <td id='minutesAway'>" + childSnapshot.val().minutesAway + "</td> </tr>"); 

    },

    //Handle Errors
    function(errorObject)
    {
      console.log("Errors Handled" + errorObject.code);

    });