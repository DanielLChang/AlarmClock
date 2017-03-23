function showClock() {
  let date = new Date();

  document.getElementById('clock').innerText =
    date.toLocaleTimeString('en-US');
    setTimeout(showClock, 1000);
}

showClock();
