let idProducto;

async function testCreateProducto() {
    return fetch(`http://localhost:8080/createProducto/1/PRODUCTO/PRODUCTO/999/999`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Producto:`, data); 
            idProducto = data.id; 
        })
        .catch(error => console.error(`Error in Create Producto:`, error));
}

async function testReadProducto() {
    return fetch(`http://localhost:8080/readProducto/-1`)
        .then(response => response.json())
        .then(data => console.log(`Read Producto:`, data))
        .catch(error => console.error(`Error in Read Producto:`, error));
}

async function testGetProducto() {
    return fetch(`http://localhost:8080/getProducto/${idProducto}`)
        .then(response => response.json())
        .then(data => console.log(`Get Producto:`, data))
        .catch(error => console.error(`Error in Get Producto:`, error));
}

async function testUpdateProducto() {
        return fetch(`http://localhost:8080/updateProducto/1/PRUEBA1/PRUEBA1/888/888`)
        .then(response => response.json())
        .then(data => console.log(`Update Producto:`, data))
        .catch(error => console.error(`Error in Update Producto:`, error));
}

async function testDeleteProducto() {
    return fetch(`http://localhost:8080/deleteProducto/1/${idProducto}`)
        .then(response => response.json())
        .then(data => console.log(`Delete Producto:`, data))
        .catch(error => console.error(`Error in Delete Producto:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  PRODUCTO  -----------------'); 
    await testCreateProducto();
    await testReadProducto();
    await testGetProducto();
    await testUpdateProducto();
    await testDeleteProducto();
    console.log('----------------  FIN PRODUCTO  -----------------');
}