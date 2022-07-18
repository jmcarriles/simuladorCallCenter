let totalCalls = 150;
let lostCalls = 34;
let answeredCalls = 116;
let queuedCalls = 12;
let avgWaitingCalls = 120;
let timeWait;
let avgLostCalls;
let avgAnsweredtCalls;

//Funcion para crear el objeto Agente
function Agente(id, name) {
    this.id = id;
    this.name = name;
}

//Matriz de objetos literales agentes
const agentes = [
    { id: 1111, name: 'Juan Pablo Roma' },
    { id: 2222, name: 'Mariana Sasiana' },
    { id: 3333, name: 'Rosario Martinez' },
    { id: 4444, name: 'Leonardo Romero' },
    { id: 5555, name: 'Susana Miro' },
    { id: 6666, name: 'Esteban Somosa' }
];

//Llamado a la funcion para crear un nuevo objeto agente e insertarlo en la matriz
const Agente1 = new Agente(7777, 'Pedro Ronco');
agentes.push(Agente1);


//Funcion para calcular promedios de llamadas
function avgCalls(callType) {
    let avg = (callType * 100) / totalCalls;
    return avg;
}

//Calculos de promedios de llamadas
avgLostCalls = avgCalls(lostCalls);
avgAnsweredtCalls = avgCalls(answeredCalls);
timeWait = (queuedCalls * avgWaitingCalls) / 60

//Funcion para encontrar agente por medio de el ID, utilizando la funcion de orden superior find
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

//Funcion para agregar via web un objeto agente, que analiza si el ID del agente ya existe y en el caso de que no exista lo inserta.
function agregarAgenteWeb() {
    const nuevoAgente = { id: parseInt(prompt('Ingrese el numero de legajo')), name: prompt('Ingrese el nombre del agente') };
    const index = agentes.findIndex(object => object.id === nuevoAgente.id);

    if (nuevoAgente.id === NaN || nuevoAgente.name === null || nuevoAgente.name === '') {
        alert('Legajo o Nombre Incorrecto')

    }
    else {

        if (index === -1) {
            agentes.push(nuevoAgente);
            alert('El agente se agrego al sistema')
            console.log(agentes)
        }
        else {
            alert('El legajo ya existe')
        }


    }
}

document.getElementById("totalCalls").innerHTML = totalCalls;
document.getElementById("lostCalls").innerHTML = lostCalls;
document.getElementById("answeredCalls").innerHTML = answeredCalls;
document.getElementById("queuedCalls").innerHTML = queuedCalls;
document.getElementById("timeWait").innerHTML = "Tiempo de espera estimado " + timeWait + " minutos";
document.getElementById("avgLostCalls").innerHTML = avgLostCalls.toFixed(2) + "%";
document.getElementById("avgAnsweredCalls").innerHTML = avgAnsweredtCalls.toFixed(2) + "%";