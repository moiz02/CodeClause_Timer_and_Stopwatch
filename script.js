var stopwatchMinutesLabel = document.getElementById("stopwatch-minutes");
var stopwatchSecondsLabel = document.getElementById("stopwatch-seconds");
var stopwatchMillisecondsLabel = document.getElementById("stopwatch-milliseconds");
var stopwatchStartButton = document.getElementById("stopwatch-start");
var stopwatchStopButton = document.getElementById("stopwatch-stop");
var stopwatchResetButton = document.getElementById("stopwatch-reset");
var timerMinutesInput = document.getElementById("timer-minutes");
var timerSecondsInput = document.getElementById("timer-seconds");
var timerStartButton = document.getElementById("timer-start");
var timerStopButton = document.getElementById("timer-stop");
var timerResetButton = document.getElementById("timer-reset");
var stopwatchStartTime;
var timerStartTime;
var stopwatchInterval;
var timerInterval;

function startStopwatch() {
  stopwatchStartTime = Date.now();
  stopwatchInterval = setInterval(updateStopwatch, 10);
  stopwatchStartButton.disabled = true;
  stopwatchStopButton.disabled = false;
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchStartButton.disabled = false;
  stopwatchStopButton.disabled = true;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchMinutesLabel.textContent = "00";
  stopwatchSecondsLabel.textContent = "00";
  stopwatchMillisecondsLabel.textContent = "00";
  stopwatchStartButton.disabled = false;
  stopwatchStopButton.disabled = true;
}

function updateStopwatch() {
  var elapsedTime = Date.now() - stopwatchStartTime;
  var minutes = Math.floor(elapsedTime / (1000 * 60));
  var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((elapsedTime % 1000) / 10);

  stopwatchMinutesLabel.textContent = padTime(minutes);
  stopwatchSecondsLabel.textContent = padTime(seconds);
  stopwatchMillisecondsLabel.textContent = padTime(milliseconds);
}

function startTimer() {
  var minutes = parseInt(timerMinutesInput.value);
  var seconds = parseInt(timerSecondsInput.value);

  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter valid minutes and seconds for the timer.");
    return;
  }

  var totalMilliseconds = (minutes * 60 + seconds) * 1000;
  timerStartTime = Date.now() + totalMilliseconds;
  timerInterval = setInterval(updateTimer, 10);
  timerMinutesInput.disabled = true;
  timerSecondsInput.disabled = true;
  timerStartButton.disabled = true;
  timerStopButton.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  timerStartButton.disabled = false;
  timerStopButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerMinutesInput.disabled = false;
  timerSecondsInput.disabled = false;
  timerMinutesInput.value = "";
  timerSecondsInput.value = "";
  timerStartButton.disabled = false;
  timerStopButton.disabled = true;
}

function updateTimer() {
  var elapsedTime = timerStartTime - Date.now();
  if (elapsedTime <= 0) {
    clearInterval(timerInterval);
    timerMinutesInput.disabled = false;
    timerSecondsInput.disabled = false;
    timerMinutesInput.value = "";
    timerSecondsInput.value = "";
    timerStartButton.disabled = false;
    timerStopButton.disabled = true;
    alert("Timer has finished!");
    return;
  }

  var minutes = Math.floor(elapsedTime / (1000 * 60));
  var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((elapsedTime % 1000) / 10);

  timerMinutesInput.value = padTime(minutes);
  timerSecondsInput.value = padTime(seconds);
}

function padTime(time) {
  return time < 10 ? "0" + time : time;
}

stopwatchStartButton.addEventListener("click", startStopwatch);
stopwatchStopButton.addEventListener("click", stopStopwatch);
stopwatchResetButton.addEventListener("click", resetStopwatch);

timerStartButton.addEventListener("click", startTimer);
timerStopButton.addEventListener("click", stopTimer);
timerResetButton.addEventListener("click", resetTimer);

startStopwatch();
