// Alarm View Effects

export default class AlarmView {
  constructor(activePeriodBtn, alarmList) {
    this.activePeriodBtn = activePeriodBtn;
    this.alarmList = alarmList;
  }

  // Add active period class on selected element
  // and remove from unselected
  selectPeriodBtn(el) {
    this.activePeriodBtn.classList.remove('active-period');
    el.classList.add('active-period');
    this.activePeriodBtn = el;
  }

  // Display alarms set
  displayAlarms(alarms) {
    // Reset display
    this.alarmList.innerText = '';
    if (alarms.length === 0) return this.createAlarmEl('No Alarms');

    for (let i = 0; i < alarms.length; i++) {
      const alarm = alarms[i];
      this.createAlarmEl(alarm.toString(), i);
    }
  }

  // Create Alarm Element
  createAlarmEl(text, idx) {
    const alarmEl = document.createElement('div');
    alarmEl.classList.add('alarm-el');
    alarmEl.innerText = text;
    this.alarmList.appendChild(alarmEl);
    if (text !== 'No Alarms') this.createRemoveBtn(alarmEl, idx);
  }

  // Create Remove Button
  createRemoveBtn(el, idx) {
    const removeEl = document.createElement('i');
    removeEl.classList.add('fa', 'fa-times-circle', 'remove-el');
    removeEl.setAttribute('key', idx);
    el.appendChild(removeEl);
  }
}
