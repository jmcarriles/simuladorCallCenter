
//Consulta si hay información en el localStorage y se lo asigna a el arreglo agentes o lo define como vacio en el caso de que sea undefined o null
const agentes = JSON.parse(localStorage.getItem("agentes-lista")) ?? [];
let totalCalls, timeWait, avgLostCalls, avgAnsweredtCalls;
let avgWaitingCalls = 120;

//Evento de click para calcular llamadas
const btnCalcularLlamadas = document.querySelector('#btnCalcularLlamadas');
btnCalcularLlamadas.addEventListener('click', (event) => {
    event.preventDefault();
    calcularLlamadas()
});


//Funcion validar llamadas

async function calcularLlamadas() {

    let { value: answeredCalls } = await Swal.fire({
        input: 'number',
        inputLabel: 'Llamadas Atendidas',
        inputAttributes: {
            'aria-label': 'Llamadas Atendidas',
        },
        showCancelButton: true
    })

    let { value: lostCalls } = await Swal.fire({
        input: 'number',
        inputLabel: 'Llamadas Perdidas',
        inputAttributes: {
            'aria-label': 'Llamadas Perdidas'
        },
        showCancelButton: true
    })

    let { value: queuedCalls } = await Swal.fire({
        input: 'number',
        inputLabel: 'Llamadas en cola',
        inputPlaceholder: 'Llamadas en cola',
        inputAttributes: {
            'aria-label': 'Llamadas en cola'
        },
        showCancelButton: true
    })

    //Define en 0 todo parametro no cancelado
    lostCalls = (lostCalls === undefined) ? lostCalls = parseInt(0) : lostCalls;
    answeredCalls = (answeredCalls === undefined) ? answeredCalls = parseInt(0) : answeredCalls;
    queuedCalls = (queuedCalls === undefined) ? queuedCalls = parseInt(0) : queuedCalls;

    //Hace los calculos de las llamadas
    totalCalls = parseInt(answeredCalls) + parseInt(lostCalls);
    avgLostCalls = avgCalls(parseInt(lostCalls));
    avgAnsweredtCalls = avgCalls(parseInt(answeredCalls));
    timeWait = (parseInt(queuedCalls) * avgWaitingCalls) / 60;

    //Escribe en el HTML
    document.getElementById("lostCalls").innerHTML = lostCalls;
    document.getElementById("answeredCalls").innerHTML = answeredCalls;
    document.getElementById("totalCalls").innerHTML = totalCalls;
    document.getElementById("avgLostCalls").innerHTML = avgLostCalls.toFixed(2) + "% de llamadas perdidas";
    document.getElementById("avgAnsweredCalls").innerHTML = avgAnsweredtCalls.toFixed(2) + "% de llamadas atendidas";
    document.getElementById("queuedCalls").innerHTML = queuedCalls;
    document.getElementById("timeWait").innerHTML = "Tiempo de espera estimado " + timeWait + " minutos";


}



//Funcion para crear el objeto Agente
class Agente {
    constructor(id, name, departamento) {
        this.id = id;
        this.name = name;
        this.departamento = departamento;
    }
}

//Funcion para calcular promedios de llamadas
function avgCalls(callType) {
    let avg = (callType * 100) / totalCalls;
    return avg || 0;
}

//Evento de click para encontrar Agente
const btnEncrontrarAgente = document.querySelector('#btnEncontrarAgente');
btnEncrontrarAgente.addEventListener('click', (event) => {

    event.preventDefault();
    encontrarAgente();
});


//Funcion para encontrar agente por medio de el ID, utilizando la funcion de orden superior find
async function encontrarAgente() {

    let { value: idAgente } = await Swal.fire({
        input: 'number',
        inputLabel: 'Numero de legajo',
        inputAttributes: {
            'aria-label': 'Numero de legajo',
        },
        showCancelButton: true
    }).then(idAgente => {
        if (idAgente.value) {
            return idAgente;
        }
    });

    const nombreAgente = agentes.find(x => x.id === parseInt(idAgente))

    if (nombreAgente === undefined) {
        return Swal.fire("No existe el legajo solicitado");
    }

    else if (nombreAgente.departamento === undefined) {
        Swal.fire(`Nombre: ${nombreAgente.name} Departamento: NO DEFINIDO`);
    }
    else {
        Swal.fire(`Nombre: ${nombreAgente.name} Departamento: ${nombreAgente.departamento}`);
    }
}

//Evento de click para agregar agente
const btnAgregarAgente = document.querySelector('#btnAgregarAgente');
btnAgregarAgente.addEventListener('click', (event) => {

    event.preventDefault();
    agregarAgenteWeb();
});


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
            localStorage.setItem("agentes-lista", JSON.stringify(agentes));
            alert('El agente se agrego al sistema')
            actualizarListaAgentes();

        }
        else {
            alert('El legajo ya existe')
        }

    }
}

//Evento de click para agregar/modificar departamento
const btnDepartamento = document.querySelector('#btnDepartamento');
btnDepartamento.addEventListener('click', (event) => {

    event.preventDefault();
    agregarDepartamento();
});


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
        localStorage.setItem("agentes-lista", JSON.stringify(agentes));
        actualizarListaAgentes();
    }
}

//Funcion que escribe en html el array que esta guardado en el LocalStorage y actualiza los cambios.
function actualizarListaAgentes() {
    let listadoAgentes = '';

    agentes.forEach((agente) => {
        listadoAgentes += `<div><b>Legajo:</b> ${agente.id} /////////////// <b>Nombre:</b> ${agente.name} /////////////// <b>Departamento:</b> ${agente.departamento}</div>`;
    });
    document.querySelector('#lista-agentes').innerHTML = listadoAgentes;


}


const btnMostrarOculatar = document.querySelector('#btnMostrarOculatar');

btnMostrarOculatar.addEventListener('click', (event) => {
    event.preventDefault();
    const displaylistadoAgentes = document.querySelector('#lista-agentes');
    actualizarListaAgentes()

    if (displaylistadoAgentes.style.display === 'block') {
        displaylistadoAgentes.style.display = 'none';
    }
    else {
        displaylistadoAgentes.style.display = 'block';
    }
});




