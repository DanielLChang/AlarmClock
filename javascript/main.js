function main() {
  let alarmForm = document.getElementById('alarm-form');
  let periodBtn = document.getElementById('')

  let app = new AlarmApp();
  let controller = new AlarmController(app);

  controller.submitAlarmFormListener(alarmForm);
}

main();
