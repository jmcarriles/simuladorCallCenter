let totalCalls = 150;
let lostCalls = 34;
let answeredCalls = 116;
let queuedCalls = 23; //Llamadas en cola actuales
let avgWaitingCalls = 120; //Tiempo de espera promedio de una llamada en espera en segundos
let timeWait;
let avgLostCalls;
let avgAnsweredtCalls;

for (let intentos = 0; intentos <= 3; intentos++) {

    let password = parseInt(prompt('Ingrese el password'));

    if (password === 1234) {

        function avgCalls(callType) {
            let avg = (callType *100) / totalCalls;
            return avg;
        }

        avgLostCalls = avgCalls(lostCalls);
        avgAnsweredtCalls = avgCalls(answeredCalls);

        timeWait = (queuedCalls * avgWaitingCalls) / 60
        

        document.getElementById("totalCalls").innerHTML = totalCalls;
        document.getElementById("lostCalls").innerHTML = lostCalls;
        document.getElementById("answeredCalls").innerHTML = answeredCalls;
        document.getElementById("queuedCalls").innerHTML = queuedCalls;
        document.getElementById("timeWait").innerHTML = "Tiempo de espera estimado " + timeWait + " minutos";
        document.getElementById("avgLostCalls").innerHTML = avgLostCalls.toFixed(2) + "%";
        document.getElementById("avgAnsweredCalls").innerHTML = avgAnsweredtCalls.toFixed(2) + "%";
        break
    }
    else {

        alert('Password incorrecto, ingreselo nuevamente.')

    }

    if (intentos === 3) {

        alert('No autorizado')
        window.location.href = "noautorizado.html";
    }

}
