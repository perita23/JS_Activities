document.getElementById("maxIntVal").setHTMLUnsafe(Number.MAX_VALUE)
document.getElementById("maxSHeight").setHTMLUnsafe(screen.height)
document.getElementById("maxWHeight").setHTMLUnsafe(window.innerHeight)
document.getElementById("getUrl").setHTMLUnsafe(document.URL)

/*----------------Segunda Parte-----------------*/

const minutsInput = document.getElementById("minuts");
const secondsInput = document.getElementById("seconds");

let interval;
let isPaused = false;
let remainingMinuts;
let remainingSeconds;
let alarma = new Audio("/DRUMC0.WAV");
alarma.loop = true;

function playAlarm() {
    alarma.play();
}

function stopAlarm() {
    alarma.pause();
    alarma.currentTime = 0;
}

function startCron() {
    if (interval) {
        clearInterval(interval);
    }

    let minuts = parseInt(minutsInput.value);
    let seconds = parseInt(secondsInput.value);

    if (isNaN(minuts) || isNaN(seconds) || minuts < 0 || seconds < 0 || seconds > 59) {
        alert("Por favor, introduce un tiempo válido.");
        return;
    }

    if (isPaused && remainingSeconds != 0 && remainingMinuts != 0) {
        minuts = remainingMinuts;
        seconds = remainingSeconds;
    }

    interval = setInterval(function () {
        if (seconds == 0) {
            if (minuts == 0) {
                clearInterval(interval);
                playAlarm();
                return;
            } else {
                minuts--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        minutsInput.value = minuts;
        secondsInput.value = seconds;
    }, 1000);

    isPaused = false;
}

function pauseCron() {
    if (interval) {
        clearInterval(interval);
        isPaused = true;
        remainingMinuts = minutsInput.value
        remainingSeconds = secondsInput.value
    }
}

function resetCron() {
    clearInterval(interval);
    minutsInput.value = 0;
    secondsInput.value = 0;
    isPaused = false;
    remainingMinuts = null
    remainingSeconds = null
    stopAlarm();
}
