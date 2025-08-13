 let display = document.getElementById('display');
        let startBtn = document.getElementById('start-btn');
        let stopBtn = document.getElementById('stop-btn');
        let resetBtn = document.getElementById('reset-btn');
        let lapBtn = document.getElementById('lap-btn');
        let lapList = document.getElementById('lap-list');
        let clockSound = document.getElementById('clock-sound');

        let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
        let timer = null;
        let lapCounter = 1;
        let lastLapTime = 0;


        function getTimeInMS() {
            return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds * 10;
        }

        function formatTime(hours, minutes, seconds, milliseconds) {
            let h = hours < 10 ? '0' + hours : hours;
            let m = minutes < 10 ? '0' + minutes : minutes;
            let s = seconds < 10 ? '0' + seconds : seconds;
            let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;
            return `${h}:${m}:${s}:${ms}`;
        }

        function updateDisplay() {
            display.textContent = formatTime(hours, minutes, seconds, milliseconds);
        }

        function handleStart() {
            milliseconds++
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0
                    minutes++
                    if (minutes === 60) {
                        minutes = 0
                        hours++
                        if (hours === 24) {
                            hours = 0
                            minutes = 0
                            seconds = 0
                            milliseconds = 0
                        }
                    }
                }
            }

            updateDisplay()

        }

        startBtn.addEventListener('click', () => {
            if (timer !== null) {
                clearInterval(timer)
            }
            timer = setInterval(handleStart, 10);
            clockSound.play();
        })

        stopBtn.addEventListener('click', () => {
            clearInterval(timer)
            clockSound.pause();
        })
        resetBtn.addEventListener('click', () => {
            clearInterval(timer)
            hours = 0;
            minutes = 0;
            seconds = 0;
            milliseconds = 0;
            display.textContent = '00:00:00:00'
            lapList.innerHTML = '';
            lapCounter = 1;
            lastLapTime = 0;
            clockSound.pause();

        })

        lapBtn.addEventListener('click', () => {
            let currentTimeMS = getTimeInMS();
            let lapTimeMS = currentTimeMS - lastLapTime;
            lastLapTime = currentTimeMS;

            let h = Math.floor(lapTimeMS / 3600000);
            let m = Math.floor((lapTimeMS % 3600000) / 60000);
            let s = Math.floor((lapTimeMS % 60000) / 1000);
            let ms = Math.floor((lapTimeMS % 1000) / 10);

            let lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCounter++}: ${formatTime(h, m, s, ms)}`;
            lapList.prepend(lapItem);
        })
