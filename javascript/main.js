function main() {
  let alarmForm = document.getElementById('alarm-form');
  let activePeriodBtn = document.getElementById('am-btn');
  let periodBtns = document.getElementById('alarm-period-btns');
  let alarmList = document.getElementById('alarm-list');

  let app = new AlarmApp();
  let view = new AlarmView(activePeriodBtn, alarmList);
  let controller = new AlarmController(app, view);

  controller.addPeriodBtnListener(periodBtns);
  controller.submitAlarmFormListener(alarmForm);
  controller.addAlarmListener();
}

main();
