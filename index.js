const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let currentTime = 0;
let elapsedTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    startBtn.classList.add("yellow");
    pauseBtn.classList.remove("yellow");
    intervalId = setInterval(updateTime, 75);
  }
});
resetBtn.addEventListener("click", () => {
  startBtn.classList.remove("yellow");
  pauseBtn.classList.remove("yellow");
  resetBtn.classList.add("red");
  setTimeout(() => {
    resetBtn.classList.remove("red");
  }, 500);
  startTime = 0;
  currentTime = 0;
  elapsedTime = 0;
  paused = true;

  hrs = 0;
  mins = 0;
  secs = 0;
  clearInterval(intervalId);
  timeDisplay.textContent = "00:00:00";
});
pauseBtn.addEventListener("click", () => {
  if (!paused) {
    startBtn.classList.remove("yellow");
    pauseBtn.classList.add("yellow");
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});

function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = pad(Math.floor((elapsedTime / 1000) % 60));
  mins = pad(Math.floor((elapsedTime / (1000 * 60)) % 60));
  hrs = pad(Math.floor((elapsedTime / (1000 * 60 * 60)) % 60));

  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}


