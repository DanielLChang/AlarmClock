// Alarm App Util Functions

export default class AlarmApp {
  constructor() {
    this.alarmList = [];
    this.period = 'AM';
  }

  // Add Alarm to AlarmList
  addAlarm(alarm) {
    this.alarmList.push(alarm);
  }

  // Check if Alarm is not already set
  isUnique(alarm) {
    if (this.alarmList.length === 0) return true;
    const length = this.alarmList.length;

    for (let i = 0; i < length; i++) {
      const curr = this.alarmList[i];
      if (curr.hr === alarm.hr
        && curr.min === alarm.min
        && curr.period === alarm.period) return false;
    }

    return true;
  }

  // Check if any Alarm has been met
  checkAlarms() {
    const time = new Date();
    const length = this.alarmList.length;

    for (let i = 0; i < length; i++) {
      const alarm = this.alarmList[i];
      if (alarm.matches(time)) {
        return i;
      }
    }

    return -1;
  }

  // Simple alert message
  alertAlarm(alarm) {
    alert(`It is now ${alarm.toString()}`);
  }

  // Remove specific Alarm from AlarmList
  removeAlarm(idx) {
    const intIdx = parseInt(idx);
    const beforeIdx = this.alarmList.slice(0, intIdx);
    const afterIdx = this.alarmList.slice(intIdx + 1);

    if (idx === 0) {
      this.alarmList = afterIdx;
    } else {
      this.alarmList = beforeIdx.concat(afterIdx);
    }
  }
}
