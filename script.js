let seconds = 0;
let milliSeconds = 0;
let minutes = 0;
let hours = 0;
let paused = false;

const milliSecondsElement = document.getElementById("milli-seconds");
const secondsElement = document.getElementById("seconds");
const minutesElement = document.getElementById("minutes");
const resetBtn = document.getElementById("reset");
const controlBtn = document.getElementById("control");
const lapBtn = document.getElementById("lap");
const lapElement = document.getElementById("laps");

const updateState = {
  milliSecond: () => {
    milliSecondsElement.textContent =
      milliSeconds < 10 ? "0" + milliSeconds : milliSeconds;
  },
  second: () => {
    secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;
  },
  minute: () => {
    minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
  },
  all: function () {
    this.milliSecond();
    this.second();
    this.minute();
  },
};

const intervalFunction = () => {
  if (milliSeconds >= 99) {
    milliSeconds = 0;
    if (seconds >= 59) {
      seconds = 0;
      if (minutes >= 59) {
        minutes = 0;
      }
      minutes += 1;
      updateState.minute();
    }
    seconds += 1;
    updateState.second();
  }
  milliSeconds += 1;
  updateState.milliSecond();
};

let interval;

const pause = () => {
  paused = !paused;
  clearInterval(interval);
};

const start = () => {
  paused = !paused;
  interval = setInterval(intervalFunction, 10);
};

controlBtn.addEventListener("click", () => {
  paused ? pause() : start();
});

resetBtn.addEventListener("click", () => {
  pause();
  minutes = 0;
  seconds = 0;
  milliSeconds = 0;
  updateState.all();
});

lapBtn.addEventListener("click", () => {
  const element = document.createElement("li");
  element.textContent = `${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds < 10 ? "0" + seconds : seconds
  } . ${milliSeconds < 10 ? "0" + milliSeconds : milliSeconds}`;
  lapElement.appendChild(element);
});
