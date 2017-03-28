// Alarm Functions

export default class Alarm {
  constructor(hr, min, period) {
    this.hr = hr;
    this.min = min;
    this.period = period;
    this.time = new Date();

    // Set Alarm time to 24 Hour Format
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

  // Check if alarms match
  matches(timeToCheck) {
    return this.time.getHours() === timeToCheck.getHours()
      && this.time.getMinutes() === timeToCheck.getMinutes()
      && this.time.getSeconds() === timeToCheck.getSeconds();
  }

  // Check if alarm is valid input
  isValid() {
    return this.hr > 0 && this.hr < 13
      && this.min > -1 && this.min < 60;
  }

  // Convert to US string format
  toString() {
    return this.time.toLocaleTimeString('en-US');
  }
}
