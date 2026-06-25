let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

function updateDisplay() {

    let hours = Math.floor(elapsedTime / 3600000);

    let minutes = Math.floor(
        (elapsedTime % 3600000) / 60000
    );

    let seconds = Math.floor(
        (elapsedTime % 60000) / 1000
    );

    let milliseconds = elapsedTime % 1000;

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(3, "0");
}

function startTimer() {

    if (!running) {

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {

            elapsedTime = Date.now() - startTime;

            updateDisplay();

        }, 10);

        running = true;
    }
}

function pauseTimer() {

    clearInterval(timerInterval);

    running = false;
}

function resetTimer() {

    clearInterval(timerInterval);

    running = false;

    elapsedTime = 0;

    lapCount = 1;

    laps.innerHTML = "";

    updateDisplay();
}

function recordLap() {

    if (elapsedTime === 0) return;

    let li = document.createElement("li");

    li.textContent =
        "Lap " + lapCount + " ➜ " + display.textContent;

    laps.appendChild(li);

    lapCount++;
}

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

lapBtn.addEventListener("click", recordLap);

updateDisplay();