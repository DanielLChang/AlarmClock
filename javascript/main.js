function main() {
  let alarmForm = document.getElementById('alarm-form');
  let alarmPeriod = document.getElementById('am-btn');
  let periodBtns = document.getElementById('alarm-period-btns');

  let app = new AlarmApp();
  let controller = new AlarmController(app);

  controller.addPeriodBtnListener(periodBtns);
  controller.submitAlarmFormListener(alarmForm);
}

main();
