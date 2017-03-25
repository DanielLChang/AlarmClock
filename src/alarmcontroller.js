// Controller for listeners
import Alarm from './alarm.js';

export default class AlarmController {
  constructor(alarmApp, alarmView) {
    this.alarmApp = alarmApp;
    this.alarmView = alarmView;
  }


  // Listener to select period AM/PM
  addPeriodBtnListener(el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      this.alarmView.selectPeriodBtn(e.target);
      this.alarmApp.period = e.target.value;
    });
  }

  // Listener to add Alarm
  submitAlarmFormListener(el) {
    el.addEventListener('submit', (e) => {
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
    });
  }

  // Listener on one second interval to check if Alarm has been met
  // If met, alert and remove
  checkAlarmListener() {
    setInterval(() => {
      let idx = this.alarmApp.checkAlarms();
      if (idx >= 0) {
        let alarm = this.alarmApp.alarmList[idx];
        this.alarmApp.alertAlarm(alarm);
        this.alarmApp.removeAlarm(idx)
        this.alarmView.displayAlarms(this.alarmApp.alarmList);
      }
    }, 1000);
  }
}
