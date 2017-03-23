function AlarmController(alarmApp, alarmView) {
  this.alarmApp = alarmApp;
}

AlarmController.prototype.addPeriodBtnListener = function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.alarmApp.period = e.target.value;
  }.bind(this));
  console.log(this.alarmApp.period);
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
        this.alarmApp.sortList();
      } else {
        alert("Alarm already exists");
      }
    } else {
      alert("Invalid input");
    }

    console.log(this.alarmApp.alarmList);
  }.bind(this));
}
