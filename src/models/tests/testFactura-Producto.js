let id;

async function testCreateFacturaProducto() {
    return fetch(`http://localhost:8080/createFacturaProducto/1/1/1/99/999`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Factura:`, data); 
            id = data.id; 
        })
        .catch(error => console.error(`Error in Create Factura:`, error));
}

async function testReadFacturaProdcuto() {
    return fetch(`http://localhost:8080/readFacturaProducto/1`)
        .then(response => response.json())
        .then(data => console.log(`Read Factura:`, data))
        .catch(error => console.error(`Error in Read Factura:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  FACTURA-PRODUCTO  -----------------');
    await testCreateFacturaProducto();
    await testReadFacturaProdcuto();
    console.log('----------------  FIN FACTURA-PRODUCTO  -----------------');
}