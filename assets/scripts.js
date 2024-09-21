// 1. Horloge
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock-display').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Minuteur
let timerInterval;
document.getElementById('timer-start').addEventListener('click', () => {
    const input = parseInt(document.getElementById('timer-input').value);
    let time = isNaN(input) ? 0 : input;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            document.getElementById('timer-display').textContent = time;
        } else {
            clearInterval(timerInterval);
            alert('Le temps est écoulé !');
        }
    }, 1000);
});

document.getElementById('timer-stop').addEventListener('click', () => {
    clearInterval(timerInterval);
});

// 3. Chronomètre
let stopwatchInterval;
let stopwatchTime = 0;
let running = false;
document.getElementById('stopwatch-start-stop').addEventListener('click', () => {
    if (!running) {
        running = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById('stopwatch-display').textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        }, 1000);
    } else {
        clearInterval(stopwatchInterval);
        running = false;
    }
});

document.getElementById('stopwatch-lap').addEventListener('click', () => {
    if (running) {
        const lapTime = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        const li = document.createElement('li');
        li.textContent = lapTime;
        document.getElementById('lap-list').appendChild(li);
    }
});

document.getElementById('stopwatch-reset').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    running = false;
    stopwatchTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00';
    document.getElementById('lap-list').innerHTML = '';
});

// 4. Réveil
let alarms = [];

document.getElementById('set-alarm').addEventListener('click', () => {
    const time = document.getElementById('alarm-time').value;
    const message = document.getElementById('alarm-message').value;
    if (time && message) {
        alarms.push({ time, message });
        displayAlarms();
    }
});

function displayAlarms() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';
    const now = new Date();
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        const alarmDate = new Date();
        const [hour, minute] = alarm.time.split(':');
        alarmDate.setHours(hour);
        alarmDate.setMinutes(minute);
        alarmDate.setSeconds(0);
        
        const timeDiff = alarmDate - now;
        li.textContent = `${alarm.time} - ${alarm.message} (${timeDiff > 0 ? 'dans ' + Math.ceil(timeDiff / 60000) + ' min' : 'passée'})`;
        if (timeDiff > 0) {
            setTimeout(() => {
                alert(alarm.message);
            }, timeDiff);
        }
        alarmList.appendChild(li);
    });
}
