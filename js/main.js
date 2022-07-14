let totalCalls = 150;
let lostCalls = 34;
let answeredCalls = 116;
let queuedCalls = 12; //Llamadas en cola actuales
let avgWaitingCalls = 120; //Tiempo de espera promedio de una llamada en espera en segundos
let timeWait;
let avgLostCalls;
let avgAnsweredtCalls;

const agentes = [{ id: 1111, name: 'Juan Pablo Roma' }, { id: 2222, name: 'Mariana Sasiana' }, { id: 3333, name: 'Rosario Martinez' }, { id: 4444, name: 'Leonardo Romero' }, { id: 5555, name: 'Susana Miro' }, { id: 6666, name: 'Esteban Somosa' }];



for (let intentos = 0; intentos <= 3; intentos++) {

    let password = parseInt(prompt('Ingrese el password'));

    if (password === 1234) {

        function avgCalls(callType) {
            let avg = (callType * 100) / totalCalls;
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

function encontrarAgente() {
    idAgente = parseInt(prompt('Por favor ingrese su numero de legajo'))
    const nombreAgente = agentes.find(x => x.id === idAgente)

    if (nombreAgente === undefined) {
        return alert('No existe el agente solicitado')
    }
    else {
        return alert(nombreAgente.name);
    }
}

function agregarAgente() {
    const nuevoAgente = { id: parseInt(prompt('Ingrese el numero de legajo')), name: prompt('Ingrese el nombre del agente') };
    const index = agentes.findIndex(object => object.id === nuevoAgente.id);

    if (index === -1) {
        agentes.push(nuevoAgente);
        alert('El agente se agrego al sistema')
    }
    else{
        alert('El legajo ya existe')
    }
    
    
}

