let totalCalls, lostCalls, answeredCalls, timeWait, avgLostCalls, avgAnsweredtCalls, queuedCalls;
let avgWaitingCalls = 120;



//Funcion validar llamadas

function calcularLlamadas() {

    answeredCalls = parseInt(prompt("Ingrese la cantidad de llamadas atendidas: "));
    lostCalls = parseInt(prompt("Ingrese la cantidad de llamadas perdidas: "));
    queuedCalls = parseInt(prompt("Ingrese la cantidad de llamadas en cola"));
    alert('El tiempo promedio de una llamada en espera es de 120 segundos');
    totalCalls = answeredCalls + lostCalls;
    avgLostCalls = avgCalls(lostCalls);
    avgAnsweredtCalls = avgCalls(answeredCalls);
    timeWait = (queuedCalls * avgWaitingCalls) / 60
    document.getElementById("totalCalls").innerHTML = totalCalls;
    document.getElementById("lostCalls").innerHTML = lostCalls;
    document.getElementById("answeredCalls").innerHTML = answeredCalls;
    document.getElementById("avgLostCalls").innerHTML = avgLostCalls.toFixed(2) + "% de llamadas perdidas";
    document.getElementById("avgAnsweredCalls").innerHTML = avgAnsweredtCalls.toFixed(2) + "% de llamadas atendidas";
    document.getElementById("queuedCalls").innerHTML = queuedCalls;
    document.getElementById("timeWait").innerHTML = "Tiempo de espera estimado " + timeWait + " minutos";
    return totalCalls, answeredCalls, lostCalls;

}

//Funcion para crear el objeto Agente
class Agente {
    constructor(id, name, departamento) {
        this.id = id;
        this.name = name;
        this.departamento = departamento;
    }
}

//Matriz de objetos literales agentes
const agentes = [];


//Llamado a la funcion para crear un nuevo objeto agente e insertarlo en la matriz
const Agente1 = new Agente(1111, 'Juan Pablo Roma', 'Sistemas');
const Agente2 = new Agente(2222, 'Mariana Sasiana', 'Sistemas');
const Agente3 = new Agente(3333, 'Rosario Martinez', 'Sistemas');
const Agente4 = new Agente(4444, 'Leonardo Romero', 'Sistemas');
const Agente5 = new Agente(5555, 'Susana Miro', 'Sistemas');
const Agente6 = new Agente(6666, 'Esteban Somosa', 'Sistemas');
const Agente7 = new Agente(7777, 'Pedro Ronco', 'Sistemas');

agentes.push(Agente1, Agente2, Agente3, Agente4, Agente5, Agente6, Agente7);



//Funcion para calcular promedios de llamadas
function avgCalls(callType) {
    let avg = (callType * 100) / totalCalls;
    return avg;
}

//Calculos de promedios de llamadas


//Funcion para encontrar agente por medio de el ID, utilizando la funcion de orden superior find
function encontrarAgente() {
    idAgente = parseInt(prompt('Por favor ingrese su numero de legajo'))
    const nombreAgente = agentes.find(x => x.id === idAgente)

    if (nombreAgente === undefined) {
        return alert('No existe el agente solicitado')
    }

    else if (nombreAgente.departamento === undefined) {
        alert(nombreAgente.name + ' DEPARTAMENTO NO DEFINIDO');
    }
    else {
        return alert(nombreAgente.name + ' ' + nombreAgente.departamento);
    }
}

//Funcion para agregar via web un objeto agente, que analiza si el ID del agente ya existe y en el caso de que no exista lo inserta.
function agregarAgenteWeb() {
    const nuevoAgente = { id: parseInt(prompt('Ingrese el numero de legajo')), name: prompt('Ingrese el nombre del agente'), departamento: prompt('Ingrese el departamento') };
    const index = agentes.findIndex(object => object.id === nuevoAgente.id);

    if (nuevoAgente.name === null || nuevoAgente.name === '' || nuevoAgente.id === null || nuevoAgente.id === '') {
        alert('Legajo o Nombre Incorrecto')

    }

    else if (isNaN(nuevoAgente.id) === true) {
        alert('El numero de legajo puede ser solo numerico')
    }

    else {

        if (index === -1) {
            agentes.push(nuevoAgente);
            alert('El agente se agrego al sistema')
            actualizarListaAgentes();
        }
        else {
            alert('El legajo ya existe')
        }

    }
}

//Funcion que busca el array el objeto que tenga el id ingresado y le permite modificar / agregar el parametro 'Departamento' 
function agregarDepartamento() {
    const idBuscado = { id: parseInt(prompt('Ingrese el numero de legajo de la persona que quiere modificar el departamento')) }
    const index = agentes.findIndex(object => object.id === idBuscado.id);

    if (index === -1) {
        alert('Legajo Inexistente')
    }

    else {
        agentes[index].departamento = (prompt('Por Favor ingrese el Departamento'))
        alert('Departamento modificado')
        actualizarListaAgentes();
    }
}

function actualizarListaAgentes() {
let listadoAgentes = '';

agentes.forEach((agente) => { 
    listadoAgentes += `<div><b>Nombre:</b> ${agente.name} /////////////// <b>Departamento:</b> ${agente.departamento}</div>`;
});

document.getElementById("lista-agentes").innerHTML = listadoAgentes;
}