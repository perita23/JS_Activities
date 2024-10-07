document.getElementById("maxIntVal").setHTMLUnsafe(Number.MAX_VALUE)
document.getElementById("maxSHeight").setHTMLUnsafe(screen.height)
document.getElementById("maxWHeight").setHTMLUnsafe(window.innerHeight)
document.getElementById("getUrl").setHTMLUnsafe(document.URL)

/*----------------Segunda Parte-----------------*/

const minuts = document.getElementById("minuts")
const seconds = document.getElementById("seconds")


function startCron() {
    if (seconds.value <= 59) {
        if (seconds.value == 0) {
            if (minuts.value == 0 && seconds.value == 0) {
                return null
            }
            minuts.value = minuts.value-1;
            seconds.value = 59;
        }
        seconds.value = seconds.value-1;
    } else {
        alert("No puedes mas de 59 segundos ")
    }
    
}
