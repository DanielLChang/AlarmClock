// Alarm View Effects

function AlarmView(activePeriodBtn, alarmList) {
  this.activePeriodBtn = activePeriodBtn;
  this.alarmList = alarmList;
}

// Add active period class on selected element
// and remove from unselected
AlarmView.prototype.selectPeriodBtn = function(el){
  this.activePeriodBtn.classList.remove('active-period');
  el.classList.add('active-period');
  this.activePeriodBtn = el;
}

// Display alarms set
AlarmView.prototype.displayAlarms = function(alarms) {
  if (alarms.length === 0) return;
  // Reset display
  this.alarmList.innerText = '';

  for (let i = 0; i < alarms.length; i++) {
    let alarm = alarms[i];
    let alarmEl = document.createElement('div');
    alarmEl.classList.add('alarm-el');
    alarmEl.innerText = alarm.time.toLocaleTimeString();
    this.alarmList.appendChild(alarmEl);
  }
}
