/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Alarm App Util Functions

class AlarmApp {
  constructor() {
    this.alarmList = [];
    this.period = 'AM';
  }

  // Add Alarm to AlarmList
  addAlarm(alarm) {
    this.alarmList.push(alarm);
  }

  // Check if Alarm is not already set
  isUnique(alarm) {
    if (this.alarmList.length === 0) return true;
    const length = this.alarmList.length;

    for (let i = 0; i < length; i++) {
      const curr = this.alarmList[i];
      if (curr.hr === alarm.hr
        && curr.min === alarm.min
        && curr.period === alarm.period) return false;
    }

    return true;
  }

  // Check if any Alarm has been met
  checkAlarms() {
    const time = new Date();
    const length = this.alarmList.length;

    for (let i = 0; i < length; i++) {
      const alarm = this.alarmList[i];
      if (alarm.matches(time)) {
        return i;
      }
    }
    
    return -1;
  }

  // Simple alert message
  alertAlarm(alarm) {
    alert(`It is now ${alarm.toString()}`);
  }

  // Remove specific Alarm from AlarmList
  removeAlarm(idx) {
    const beforeIdx = this.alarmList.slice(0, idx);
    const afterIdx = this.alarmList.slice(idx + 1);

    if (idx === 0) {
      this.alarmList = afterIdx;
    } else {
      this.alarmList = beforeIdx.concat(afterIdx);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlarmApp;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alarm_js__ = __webpack_require__(3);
// Controller for listeners


class AlarmController {
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
      const hr = parseInt(e.target.alarmHr.value);
      const min = parseInt(e.target.alarmMin.value);
      const period = this.alarmApp.period;
      const newAlarm = new __WEBPACK_IMPORTED_MODULE_0__alarm_js__["a" /* default */](hr, min, period);

      // Only add if is valid time and not already existed
      if (newAlarm.isValid()) {
        if (this.alarmApp.isUnique(newAlarm)) {
          this.alarmApp.addAlarm(newAlarm);
          this.alarmView.displayAlarms(this.alarmApp.alarmList);
        } else {
          alert('Alarm already exists');
        }
      } else {
        alert('Invalid input');
      }
    });
  }

  // Listener on one second interval to check if Alarm has been met
  // If met, alert and remove
  checkAlarmListener() {
    setInterval(() => {
      const idx = this.alarmApp.checkAlarms();

      if (idx >= 0) {
        const alarm = this.alarmApp.alarmList[idx];
        this.alarmApp.alertAlarm(alarm);
        this.alarmApp.removeAlarm(idx)
        this.alarmView.displayAlarms(this.alarmApp.alarmList);
      }
    }, 1000);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlarmController;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Alarm View Effects

class AlarmView {
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
      this.createAlarmEl(alarm.toString());
    }
  }

  // Create Alarm Element
  createAlarmEl(text) {
    const alarmEl = document.createElement('div');
    alarmEl.classList.add('alarm-el');
    alarmEl.innerText = text;
    this.alarmList.appendChild(alarmEl);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlarmView;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Alarm Functions

class Alarm {
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
      && this.time.getSeconds() === timeToCheck.getSeconds()
  }

  // Check if alarm is valid input
  isValid() {
    return this.hr > 0 && this.hr < 13
      && this.min > -1 && this.min < 60
  }

  // Convert to US string format
  toString() {
    return this.time.toLocaleTimeString('en-US');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Alarm;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alarmapp_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alarmview_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__alarmcontroller_js__ = __webpack_require__(1);
// Main file to set up alarm clock app




// Current Time
const clock = () => {
  const time = new Date();
  
  document.getElementById('clock').innerText =
    time.toLocaleTimeString('en-US');
  setTimeout(clock, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Run clock on one second interval
  clock();

  // Grab DOM elements
  const alarmForm = document.getElementById('alarm-form');
  const activePeriodBtn = document.getElementById('am-btn');
  const periodBtns = document.getElementById('alarm-period-btns');
  const alarmList = document.getElementById('alarm-list');

  // Initialize Components
  const app = new __WEBPACK_IMPORTED_MODULE_0__alarmapp_js__["a" /* default */]();
  const view = new __WEBPACK_IMPORTED_MODULE_1__alarmview_js__["a" /* default */](activePeriodBtn, alarmList);
  const controller = new __WEBPACK_IMPORTED_MODULE_2__alarmcontroller_js__["a" /* default */](app, view);

  // Add Listeners
  controller.addPeriodBtnListener(periodBtns);
  controller.submitAlarmFormListener(alarmForm);
  controller.checkAlarmListener();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map