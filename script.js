let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;
let laps = [];

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const elapsedTimeContainer = document.getElementById('elapsedTime');

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('elapsed').addEventListener('click', showElapsedTime);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    laps = [];
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
    elapsedTimeContainer.innerHTML = "";
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        laps.push(`Lap ${lapCount}: ${lapTime}`);
        displayLapTimes();
    }
}

function displayLapTimes() {
    lapsContainer.innerHTML = laps.join('<br>');
}

function showElapsedTime() {
    if (running || difference) {
        const elapsedTime = display.innerHTML;
        elapsedTimeContainer.innerHTML = `Elapsed Time: ${elapsedTime}`;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
