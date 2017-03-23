function AlarmController(alarmApp, alarmView) {
  this.alarmApp = alarmApp;
  this.alarmView = alarmView;
}

AlarmController.prototype.addPeriodBtnListener = function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    this.alarmView.selectPeriodBtn(e.target);
    this.alarmApp.period = e.target.value;
  }.bind(this));
}

AlarmController.prototype.submitAlarmFormListener = function(el) {
  el.addEventListener('submit', function(e) {
    e.preventDefault();
    let hr = parseInt(e.target.alarmHr.value);
    let min = parseInt(e.target.alarmMin.value);
    let period = this.alarmApp.period;
    let newAlarm = new Alarm(hr, min, period);

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

AlarmController.prototype.addAlarmListener = function() {
  setInterval(function() {
    let idx = this.alarmApp.checkAlarms();
    if (idx) {
      let alarm = this.alarmApp.alarmList[idx];
      this.alarmApp.alertAlarm(alarm);
      this.alarmApp.removeAlarm(idx)
      this.alarmView.displayAlarms(this.alarmApp.alarmList);
    }
  }.bind(this), 1000);
}
