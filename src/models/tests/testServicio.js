let idServicio;

async function testCreateServicio() {
    return fetch(`http://localhost:8080/createServicio/1/RESERVA/00-00-0000/00-00-0000/ENTREGADO`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Servicio:`, data); 
            idServicio = data.id; 
        })
        .catch(error => console.error(`Error in Create Servicio:`, error));
}

async function testReadServicio() {
    return fetch(`http://localhost:8080/readServicio/-1`)
        .then(response => response.json())
        .then(data => console.log(`Read Servicio:`, data))
        .catch(error => console.error(`Error in Read Servicio:`, error));
}

async function testGetServicio() {
    return fetch(`http://localhost:8080/getServicio/${idServicio}`)
        .then(response => response.json())
        .then(data => console.log(`Get Servicio:`, data))
        .catch(error => console.error(`Error in Get Servicio:`, error));
}

async function testUpdateServicio() {
        return fetch(`http://localhost:8080/updateServicio/1/1/TÉCNICO/11-11-1111/11-11-1111/PAGADO/444/${idServicio}`)
        .then(response => response.json())
        .then(data => console.log(`Update Servicio:`, data))
        .catch(error => console.error(`Error in Update Servicio:`, error));
}

async function testDeleteServicio() {
    return fetch(`http://localhost:8080/deleteServicio/1/${idServicio}`)
        .then(response => response.json())
        .then(data => console.log(`Delete Servicio:`, data))
        .catch(error => console.error(`Error in Delete Servicio:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  SERVICIO  ----------------'); 
    await testCreateServicio();
    await testReadServicio();
    await testGetServicio();
    await testUpdateServicio();
    await testDeleteServicio();
    console.log('----------------  FIN SERVICIO  -----------------');
}