//Consulta si hay información en el localStorage y se lo asigna a el arreglo agentes o lo define como vacio en el caso de que sea undefined o null
const agentes = JSON.parse(localStorage.getItem("agentes-lista")) ?? [];
let totalCalls, timeWait, avgLostCalls, avgAnsweredtCalls;
let avgWaitingCalls = 120;
let queues = [];

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
    lostCalls = (lostCalls === undefined || lostCalls === '') ? lostCalls = parseInt(0) : lostCalls;
    answeredCalls = (answeredCalls === undefined || answeredCalls === '') ? answeredCalls = parseInt(0) : answeredCalls;
    queuedCalls = (queuedCalls === undefined || queuedCalls === '') ? queuedCalls = parseInt(0) : queuedCalls;

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
        inputLabel: 'Por favor ingrese el legajo',
        inputAttributes: {
            'aria-label': 'Numero de legajo',
        },
        showCancelButton: true
    }).then(idAgente => {
        if (idAgente.value) {
            return idAgente;
        }
        else {
            console.log('Seteando el ID a 0')
            idAgente.value = 0;
            return idAgente;
        }
    })

    const nombreAgente = agentes.find(x => x.id == parseInt(idAgente))

    if (nombreAgente === undefined || nombreAgente === '') {
        return Swal.fire({ html: `<div id="card mt-5"> No existe el legajo solicitado <div/>` });
    }

    else if (nombreAgente.departamento === undefined) {
        Swal.fire({ html: `<div id="card" Nombre: ${nombreAgente.name} Departamento: NO DEFINIDO <div/>` });
    }
    else {
        Swal.fire({
            html: `<div class='card text-center mt-5'>
        <h6><b>Legajo: </b>${nombreAgente.id}</h6>
        <h6><b>Nombre: </b> ${nombreAgente.name} </h6>
        <h6><b>Departamento: </b> ${nombreAgente.departamento}</h6>
        </div>` });
    }
}

//Evento de click para agregar agente
const btnAgregarAgente = document.querySelector('#btnAgregarAgente');
btnAgregarAgente.addEventListener('click', (event) => {

    event.preventDefault();
    agregarAgenteWeb();
});


//Funcion para agregar via web un objeto agente, que analiza si el ID del agente ya existe y en el caso de que no exista lo inserta.
async function agregarAgenteWeb() {


    let { value: id } = await Swal.fire({
        input: 'number',
        inputLabel: 'Por favor ingrese el legajo',
        inputAttributes: {
            'aria-label': 'Legajo',
        },
        showCancelButton: true
    })

    let { value: name } = await Swal.fire({
        input: 'text',
        inputLabel: 'Por favor ingrese el nombre',
        inputAttributes: {
            'aria-label': 'Nombre'
        },
        showCancelButton: true
    })

    let { value: departamento } = await Swal.fire({
        input: 'text',
        inputLabel: 'Por favor ingrese el departamento',
        inputPlaceholder: 'Departamento',
        inputAttributes: {
            'aria-label': 'Departamento'
        },
        showCancelButton: true
    })


    const index = agentes.findIndex(object => object.id === id);

    if (name === null || name === '' || id === null || id === '') {
        Swal.fire({ html: `<div id="card mt-5"> Legajo incorrecto <div/>` })

    }

    else {

        if (index == -1) {
            Swal.fire({ html: `<div id="card mt-5">El agente se agrego al sistema <div/>` })
            agentes.push({ id, name, departamento });
            localStorage.setItem("agentes-lista", JSON.stringify(agentes));

            /* actualizarListaAgentes(); */

        }
        else {
            Swal.fire({ html: `<div id="card mt-5"> El legajo ya existe <div/>` })
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
async function agregarDepartamento() {


    let { value: id } = await Swal.fire({
        input: 'number',
        inputLabel: 'Por favor ingrese el numero de legajo',
        inputAttributes: {
            'aria-label': 'Legajo',
        },
        showCancelButton: true
    })

    const index = agentes.findIndex(object => object.id == id)



    if (index === -1) {
        Swal.fire({ html: `<div id="card mt-5"> Legajo Inexistente <div/>` })
    }

    else {

        let { value: departament } = await Swal.fire({
            input: 'text',
            inputLabel: 'Ingrese el Departamento',
            inputAttributes: {
                'aria-label': 'Departamento',
            },
            showCancelButton: true
        })

        agentes[index].departamento = departament;
        Swal.fire({ html: `<div id="card mt-5"> Departamento modificado <div/>` })
        localStorage.setItem("agentes-lista", JSON.stringify(agentes));

    }
}

//Funcion que escribe en html el array que esta guardado en el LocalStorage y actualiza los cambios.
function actualizarListaAgentes() {
    let listadoAgentes = '';

    agentes.forEach((agente) => {
        listadoAgentes += `<div class='card text-center mt-5'>
        <h6><b>Legajo: </b>${agente.id}</h6>
        <h6><b>Nombre: </b> ${agente.name} </h6>
        <h6><b>Departamento: </b>${agente.departamento}</h6>
        </div>`;
    });
    /* document.querySelector('#lista-agentes').innerHTML = listadoAgentes; */
    Swal.fire({ html: listadoAgentes })

}

const btnMostrarAgentes = document.querySelector('#btnMostrarAgentes');

btnMostrarAgentes.addEventListener('click', (event) => {
    event.preventDefault();
    actualizarListaAgentes()

});

//Funcion que consulta la "BD" del archivo JSON y la asigna a la variable queues
async function consultaJSON() {

    await fetch("./queues.json")
        .then(response => response.json())
        .then(jsondata => {

            let tablaColas = ''
            jsondata.forEach((queue) => {

                tablaColas +=

                `<tr>
                    <th scope="row">${queue.id}</th>
                    <td>${queue.name}</td>
                    <td>${queue.anseweredCalls}</td>
                    <td>${queue.lostCalls}</td>
                    <td>${queue.queuedCalls}</td>
                </tr>`

                document.getElementById("tablaColas").innerHTML = tablaColas;

                
            })
            console.log(tablaColas)

        })
}

consultaJSON()

