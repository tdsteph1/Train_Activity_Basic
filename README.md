# Train_Activity_Basic

In this assignment, you'll create a train schedule application that incorporates Firebase to host arrival and departure data. Your app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

Make sure that your app suits this basic spec:


* When adding trains, administrators should be able to submit the following:
* Train Name
* Destination 
* First Train Time -- in military time
* Frequency -- in minutes
* Code this app to calculate when the next train will arrive; this should be relative to the current time.
* Users from many different machines must be able to view same train times.
* Styling and theme are completely up to you. Get Creative!

## Home Page of Train Scheduler
![Img1](https://github.com/tdsteph1/Train_Activity_Basic/blob/master/assets/images/img1.png)

## Adding Train1(TJ)
![Img2](https://github.com/tdsteph1/Train_Activity_Basic/blob/master/assets/images/img2.png)
Starting arrival time is at 5:00 am, the train arrives every 10 minuts and the current time is 3:22 so the train will arrive at 3:30 hence 8 min away.

## Adding Train1(TJ)
![Img3](https://github.com/tdsteph1/Train_Activity_Basic/blob/master/assets/images/img3.png)
Starting arrival time is 2:00(14:00) the current time is 3:25(15:25), the train arrives every 10 min so the train will arrive at 3:30 hence 5 min away.

## Firebase Database 2 trains added
![Img4](https://github.com/tdsteph1/Train_Activity_Basic/blob/master/assets/images/img4.png)


## Mathamatical Formula for calculating (Min Away) && (Arrival Time)
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
      
                              
