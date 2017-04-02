# Alarm Clock

This simple web application is written using vanilla Javascript (ES6). The application showcases a 12 HR format clock (in en-US). Users are able to set multiple alarms and are alerted when an alarm time is met.

## Live Page

This application is available online at https://daniellchang.github.io/AlarmClock

## Major Features

- **DONE** Displays current time with one second interval updates
- **DONE** Change time period (AM/PM)
- **DONE** Ability to set multiple alarms
- **DONE** Alerts and removes alarm when time is met
- **DONE** Submit checks inputs for validity and uniqueness

## Build/Usage Instructions

To install webpack, run `npm install -g webpack`

Since there are multiple Javascript files, instead of explicitly listing each one in the HTML document, Webpack is used to bundle the modules. Each source file will import their dependencies at the top and set their own export. The bundle is included in the `src` folder but if need be, simply run `webpack` to bundle the required files and then open `index.html` in your browser to use the application.

## Future Implementations

- **DONE** Delete alarms
- Edit alarms
- Sort alarm times (Currently alarms are in an array. Checking for specific alarm time is O(n) since needs to check each alarm. Idea for this is to have times in a heap. Insertion would be log(n), finding min would be O(1)).
- Switch from digital to analog clock format
- Implement database to store alarms
- Mobile friendly
