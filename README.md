#Alarm Clock

This simple web application is written using vanilla Javascript. The application showcases a 12 HR format clock (in en-US). Users are able to set multiple alarms and are alerted when an alarm time is met.

##Major Features
- Displays current time with one second interval updates
- Change time period (AM/PM)
- Ability to set multiple alarms
- Alerts and removes alarm when time is met
- Submit checks inputs for validity and uniqueness

##Build/Usage Instructions

Simply download the project folder and open index.html to start the application.

##Live Page

This application is also available online at https://daniellchang.github.io/AlarmClock

##Future Implementations
- Sort alarm times (Currently alarms are in an array. Checking for specific alarm time is O(n) since needs to check each alarm. Idea for this is to have times in a heap. Insertion would be log(n), finding min would be O(1)).
- Edit/Delete alarms
- Switch from digital to analog clock format
- Implement database to store alarms
