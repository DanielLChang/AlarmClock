function Alarm(hr, min, period) {
  this.hr = hr;
  this.min = min;
  this.period = period;
  this.time = new Date();

  if (hr === 12 && period === 'AM') {
    this.time.setHours(0);
  } else if (hr === 12 && period === 'PM') {
    this.time.setHours(12);
  } else if (period === 'PM') {
    this.time.setHours(hr + 12);
  } else {
    this.time.setHours(hr);
  }

  this.time.setMinutes(min);
  this.time.setSeconds(0);
}

Alarm.prototype.matches = function(timeToCheck) {
  return this.time.getHours() === timeToCheck.getHours()
    && this.time.getMinutes() === timeToCheck.getMinutes()
    && this.time.getSeconds() === timeToCheck.getSeconds()
}

Alarm.prototype.isValid = function() {
  return this.hr > 0 && this.hr < 13 && this.min > -1 && this.min < 60
}

Alarm.prototype.toString = function() {
  return this.time.toLocaleTimeString('en-US');
}
