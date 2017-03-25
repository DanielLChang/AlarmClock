// Alarm App Util Functions

function AlarmApp() {
  this.alarmList = [];
  this.period = 'AM';
}

// Add Alarm to AlarmList
AlarmApp.prototype.addAlarm = function(alarm) {
  this.alarmList.push(alarm);
}

// Check if Alarm is not already set
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

// Check if any Alarm has been met
AlarmApp.prototype.checkAlarms = function() {
  let time = new Date();
  let length = this.alarmList.length;

  for (let i = 0; i < length; i++) {
    let alarm = this.alarmList[i];
    if (alarm.matches(time)) {
      return true;
    }
  }
  return false;
}

// Simple alert message
AlarmApp.prototype.alertAlarm = function(alarm) {
  alert(`It is now ${alarm.toString()}`);
}

// Remove specific Alarm from AlarmList
AlarmApp.prototype.removeAlarm = function(idx) {
  let beforeIdx = this.alarmList.slice(0, idx);
  let afterIdx = this.alarmList.slice(idx + 1);
  this.alarmList = beforeIdx.concat(afterIdx);
}
