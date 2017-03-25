// Main file to set up alarm clock app
import AlarmApp from './alarmapp.js';
import AlarmView from './alarmview.js';
import AlarmController from './alarmcontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  const alarmForm = document.getElementById('alarm-form');
  const activePeriodBtn = document.getElementById('am-btn');
  const periodBtns = document.getElementById('alarm-period-btns');
  const alarmList = document.getElementById('alarm-list');

  const app = new AlarmApp();
  const view = new AlarmView(activePeriodBtn, alarmList);
  const controller = new AlarmController(app, view);

  controller.addPeriodBtnListener(periodBtns);
  controller.submitAlarmFormListener(alarmForm);
  controller.checkAlarmListener();
});
