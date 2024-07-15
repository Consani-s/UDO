let idFactura;

async function testCreateFactura() {
    return fetch(`http://localhost:8080/createFactura/1/1/Vendedor/1/1000`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Factura:`, data); 
            idFactura = data.id; 
        })
        .catch(error => console.error(`Error in Create Factura:`, error));
}

async function testReadFactura() {
    return fetch(`http://localhost:8080/readFactura/1`)
        .then(response => response.json())
        .then(data => console.log(`Read Factura:`, data))
        .catch(error => console.error(`Error in Read Factura:`, error));
}

async function testGetFactura() {
    return fetch(`http://localhost:8080/getFactura/${idFactura}`)
        .then(response => response.json())
        .then(data => console.log(`Get Factura:`, data))
        .catch(error => console.error(`Error in Get Factura:`, error));
}

async function testDeleteFactura() {
    return fetch(`http://localhost:8080/deleteFactura/1/${idFactura}`)
        .then(response => response.json())
        .then(data => console.log(`Delete Factura:`, data))
        .catch(error => console.error(`Error in Delete Factura:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  FACTURA  -----------------'); 
    await testCreateFactura();
    await testReadFactura();
    await testGetFactura();
    await testDeleteFactura();
    console.log('----------------  FIN FACTURA  -----------------');
}