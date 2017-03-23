function AlarmApp() {
  this.clock = new Clock();
  this.alarmList = [];
  this.period = 'AM';
}

AlarmApp.prototype.setTime = function(time) {
  this.clock.time = time;
}

AlarmApp.prototype.addAlarm = function(alarm) {
  this.alarmList.push(alarm);
}

AlarmApp.prototype.isUnique = function(alarm) {
  if (this.alarmList.length === 0) return true;
  let length = this.alarmList.length;
  for (let i = 0; i < length; i++) {
    let curr = this.alarmList[i];
    if (curr.hr === alarm.hr
      && curr.min === alarm.min
      && curr.period === alarm.period) return false;
  }
  return true;
}

AlarmApp.prototype.sortList = function() {
}

AlarmApp.prototype.checkAlarms = function() {
  let alert = false;

  let last = this.alarmList.length - 1;
  if (alarm.matches(this.clock.time)) alert = true;

  return alert;
}
