// ===============================
// STATE
// ===============================
let totalSeconds = 0;
let remainingSeconds = 0;
let timerInterval = null;

let breakPoints = [];
let breakIndex = 0;
let breakDurationSeconds = 0;
let breakRemainingSeconds = 0;
let isBreak = false;

// ===============================
// ELEMENTS
// ===============================
const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const cancelBtn = document.getElementById("timerCancel");
const statusText = document.getElementById("statusText");

const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const setTimeBtn = document.getElementById("setTimeBtn");

const breakCountEl = document.getElementById("breakCount");
const breakDurationEl = document.getElementById("breakDuration");

const breakPlus = document.getElementById("breakPlus");
const breakMinus = document.getElementById("breakMinus");
const durationPlus = document.getElementById("durationPlus");
const durationMinus = document.getElementById("durationMinus");

// ===============================
// BREAK CONTROLS
// ===============================
breakPlus.onclick = () => {
  breakCountEl.textContent = Number(breakCountEl.textContent) + 1;
};

breakMinus.onclick = () => {
  const v = Number(breakCountEl.textContent);
  if (v > 0) breakCountEl.textContent = v - 1;
};

durationPlus.onclick = () => {
  breakDurationEl.textContent = Number(breakDurationEl.textContent) + 1;
};

durationMinus.onclick = () => {
  const v = Number(breakDurationEl.textContent);
  if (v > 0) breakDurationEl.textContent = v - 1;
};

// ===============================
// DISPLAY
// ===============================
function updateDisplay(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  timerDisplay.textContent =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");
}

// ===============================
// SET TIME
// ===============================
setTimeBtn.addEventListener("click", () => {
  totalSeconds =
    Number(hourInput.value) * 3600 +
    Number(minuteInput.value) * 60;

  remainingSeconds = totalSeconds;
  updateDisplay(remainingSeconds);
  statusText.textContent = "Ready";
});

// ===============================
// START
// ===============================
startBtn.addEventListener("click", () => {
  if (remainingSeconds <= 0 || timerInterval) return;

  const breakCount = Number(breakCountEl.textContent);
  breakDurationSeconds = Number(breakDurationEl.textContent) * 60;

  // Calculate break checkpoints
  breakPoints = [];
  for (let i = 1; i <= breakCount; i++) {
    breakPoints.push(
      Math.floor(totalSeconds - (totalSeconds / (breakCount + 1)) * i)
    );
  }

  breakIndex = 0;
  isBreak = false;
  breakRemainingSeconds = 0;

  startWorkTimer();

  statusText.textContent = "Running";
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  pauseBtn.textContent = "Pause";
});

// ===============================
// WORK TIMER
// ===============================
function startWorkTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateDisplay(remainingSeconds);

    // Trigger break
    if (
      breakIndex < breakPoints.length &&
      remainingSeconds === breakPoints[breakIndex]
    ) {
      clearInterval(timerInterval);
      timerInterval = null;
      breakIndex++;
      startBreak();
      return;
    }

    // Finish
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      statusText.textContent = "Finished";
      pauseBtn.classList.add("hidden");
      startBtn.classList.remove("hidden");
    }
  }, 1000);
}

// ===============================
// BREAK TIMER
// ===============================
function startBreak() {
  if (timerInterval) return;

  isBreak = true;
  statusText.textContent = "Break";

  if (breakRemainingSeconds === 0) {
    breakRemainingSeconds = breakDurationSeconds;
  }

  updateDisplay(breakRemainingSeconds);

  timerInterval = setInterval(() => {
    breakRemainingSeconds--;
    updateDisplay(breakRemainingSeconds);

    if (breakRemainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      breakRemainingSeconds = 0;
      isBreak = false;
      statusText.textContent = "Running";

      updateDisplay(remainingSeconds);
      startWorkTimer();
    }
  }, 1000);
}

// ===============================
// PAUSE / RESUME
// ===============================
pauseBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    pauseBtn.textContent = "Resume";
    statusText.textContent = "Paused";
  } else {
    pauseBtn.textContent = "Pause";
    statusText.textContent = isBreak ? "Break" : "Running";
    isBreak ? startBreak() : startWorkTimer();
  }
});

// ===============================
// CANCEL / RESET
// ===============================
cancelBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;

  totalSeconds = 0;
  remainingSeconds = 0;
  breakRemainingSeconds = 0;
  breakPoints = [];
  breakIndex = 0;
  isBreak = false;

  updateDisplay(0);
  statusText.textContent = "Ready";

  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

// ===============================
// INIT
// ===============================
updateDisplay(0);
pauseBtn.classList.add("hidden");
statusText.textContent = "Ready";
