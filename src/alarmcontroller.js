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

      // Check if inputs are valid
      const hr = this.isValid(e.target.alarmHr.value);
      const min = this.isValid(e.target.alarmMin.value);
      const period = this.alarmApp.period;
      const newAlarm = new Alarm(hr, min, period);

      // Only add if is valid time and not already existed
      if (newAlarm.isValid()) {
        if (this.alarmApp.isUnique(newAlarm)) {
          this.alarmApp.addAlarm(newAlarm);
          this.alarmView.displayAlarms(this.alarmApp.alarmList);
          this.addRemoveListener();
        } else {
          alert('Alarm already exists');
        }
      } else {
        alert('Invalid input');
      }
    });
  }

  // Listener to remove Alarm
  addRemoveListener() {
    const list = document.getElementsByClassName('alarm-el');
    for (let i = 0; i < list.length; i++) {
      const curr = list[i];
      curr.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('key');
        if (idx) {
          this.alarmApp.removeAlarm(idx);
          this.alarmView.displayAlarms(this.alarmApp.alarmList);
          this.addRemoveListener();
        }
      });
    }
  }

  // Listener on one second interval to check if Alarm has been met
  // If met, alert and remove
  checkAlarmListener() {
    setInterval(() => {
      const idx = this.alarmApp.checkAlarms();

      if (idx >= 0) {
        const alarm = this.alarmApp.alarmList[idx];
        this.alarmApp.alertAlarm(alarm);
        this.alarmApp.removeAlarm(idx);
        this.alarmView.displayAlarms(this.alarmApp.alarmList);
        this.addRemoveListener();
      }
    }, 1000);
  }

  // Short helper method to check if input is valid number
  isValid(input) {
    if (!isNaN(input)) return parseInt(input);
  }
}
