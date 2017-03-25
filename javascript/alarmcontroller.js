// Controller for listeners

function AlarmController(alarmApp, alarmView) {
  this.alarmApp = alarmApp;
  this.alarmView = alarmView;
}

// Listener to select period AM/PM
AlarmController.prototype.addPeriodBtnListener = function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    this.alarmView.selectPeriodBtn(e.target);
    this.alarmApp.period = e.target.value;
  }.bind(this));
}

// Listener to add Alarm and display Alarms
AlarmController.prototype.submitAlarmFormListener = function(el) {
  el.addEventListener('submit', function(e) {
    e.preventDefault();
    let hr = parseInt(e.target.alarmHr.value);
    let min = parseInt(e.target.alarmMin.value);
    let period = this.alarmApp.period;
    let newAlarm = new Alarm(hr, min, period);

    // Only add if is valid time and not already existed
    if (newAlarm.isValid()) {
      if (this.alarmApp.isUnique(newAlarm)) {
        this.alarmApp.addAlarm(newAlarm);
        this.alarmView.displayAlarms(this.alarmApp.alarmList);
      } else {
        alert("Alarm already exists");
      }
    } else {
      alert("Invalid input");
    }
  }.bind(this));
}

// Listener on one second interval to check if Alarm has been met
// If met, alert and remove
AlarmController.prototype.checkAlarmListener = function() {
  setInterval(function() {
    let idx = this.alarmApp.checkAlarms();
    if (Number.isInteger(idx)) {
      let alarm = this.alarmApp.alarmList[idx];
      this.alarmApp.alertAlarm(alarm);
      this.alarmApp.removeAlarm(idx)
      this.alarmView.displayAlarms(this.alarmApp.alarmList);
    }
  }.bind(this), 1000);
}
