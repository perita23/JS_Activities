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
let alarma = new Audio("/audios/DRUMC0.WAV");
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

/*--------------------------------Tercera Parte-------------------------------------*/

let volumeInput = document.getElementById("vol").value;
let alarmHourInput = document.getElementById("alarmHour");
let alarmMinInput = document.getElementById("alarmMinuts");

let currentAlarms = document.getElementById("currentAlarms")
let alarmFinished = false;
let intervalClock;

setInterval(function () {
    let data = new Date();
    let clock = document.getElementById("reloj");

    clock.innerHTML = `<h1>`
        + data.getHours()
        + ":" + data.getMinutes()
        + ":" + data.getSeconds() + `</h1>`
}, 1000);

function change_inp_vol() {
    volumeInput = document.getElementById("vol").value;
    let tone = new Audio("/audios/tone.mp3");
    tone.volume = volumeInput;
    tone.play();
}


function setAlarm() {
    alarmHourInput = document.getElementById("alarmHour");
    alarmMinInput = document.getElementById("alarmMinuts");
    let alarmMinut = parseInt(alarmMinInput.value);
    let alarmHour = parseInt(alarmHourInput.value);
    let alarmVolume = volumeInput;
    let audioSrc = document.getElementById("alarmSound").value;
    
    let alarmSound = new Audio(audioSrc);
    alarmSound.volume = alarmVolume;

    if (isNaN(alarmHour) || isNaN(alarmMinut) || alarmHour < 0 || alarmMinut < 0 || alarmMinut > 59 || alarmHour < 0 || alarmHour > 24) {
        alert("Por favor, introduce un tiempo válido.");
        return;
    }

    if (intervalClock) {
        clearInterval(intervalClock);
    }
    console.log("alarmaSeteada")
    currentAlarms.setHTMLUnsafe("<b>Alarma para las --></b> "+alarmHour+":"+alarmMinut)
    intervalClock = setInterval(function () {
        let data = new Date();
        if (data.getHours() === alarmHour && data.getMinutes() === alarmMinut) {
            clearInterval(intervalClock);
            alarmSound.loop = true;
            alarmSound.play();  
        }
        console.log(data.getHours(), data.getMinutes());
        console.log("------")
        console.log(alarmHour,alarmMinut)
    }, 1000)
}

function resetAlarm() {
    clearInterval(intervalClock);
    currentAlarms.setHTMLUnsafe(null)
}
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    currentAlarms.setHTMLUnsafe(null)
}


