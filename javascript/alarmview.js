function AlarmView(activePeriodBtn) {
  this.activePeriodBtn = activePeriodBtn;
}

AlarmView.prototype.selectPeriodBtn = function(el){
  this.activePeriodBtn.classList.remove('active-period');
  el.classList.add('active-period');
  this.activePeriodBtn = el;
}
