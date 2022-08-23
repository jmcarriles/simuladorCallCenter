
getDataLostCalls()
getDataAnsweredCallsChart()
async function getDataLostCalls() {
    const response = await fetch('./queues.json');
    const data = await response.json();
    console.log(data);
    length = data.length;
    console.log(length);
    labels = [];
    values = [];
    for (i = 0; i < length; i++) {
        labels.push(data[i].name);
        values.push(data[i].lostCalls);
    }
    new Chart(document.getElementById("lostCallsChart"), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Llamadas Perdidas",
                    backgroundColor: ["#3a90cd",
                        "#8e5ea2",
                        "#3bba9f",
                        "#e8c3b9",
                        "#c45850",
                        "#CD9C5C",
                        "#40E0D0"],
                    data: values
                }
            ]
        },
        options: {
            legend: { display: true,
            position: 'bottom' },
            title: {
                display: true,
                text: 'Llamadas Perdidas'
            }
        }
    });
}

async function getDataAnsweredCallsChart() {
    const response = await fetch('./queues.json');
    const data = await response.json();
    console.log(data);
    length = data.length;
    console.log(length);
    labels = [];
    values = [];
    for (i = 0; i < length; i++) {
        labels.push(data[i].name);
        values.push(data[i].anseweredCalls);
    }
    new Chart(document.getElementById("answeredCallsChart"), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Llamadas Atendidas",
                    backgroundColor: ["#3a90cd",
                        "#8e5ea2",
                        "#3bba9f",
                        "#e8c3b9",
                        "#c45850",
                        "#CD9C5C",
                        "#40E0D0"],
                    data: values
                }
            ]
        },
        options: {
            legend: { display: true,
            position: 'bottom' },
            title: {
                display: true,
                text: 'Llamadas Atendidas',
            },
        }
    });
}