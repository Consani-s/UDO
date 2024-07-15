let id;
async function testCreateCategoria() {
    return fetch(`http://localhost:8080/createCategoria/1/LAPTOP`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Categoria:`, data); 
            id = data.id;
        })
        .catch(error => console.error(`Error in Create Categoria:`, error));
}

async function testReadCategoria() {
    return fetch(`http://localhost:8080/readCategoria/1`)
        .then(response => response.json())
        .then(data => console.log(`Read Categoria:`, data))
        .catch(error => console.error(`Error in Read Categoria:`, error));
}

async function testUpdateCategoria() {
    return fetch(`http://localhost:8080/updateCategoria/PRUEBA/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => console.log(`Update Categoria:`, data))
        .catch(error => console.error(`Error in Get Categoria:`, error));
}

async function testDeleteCategoria() {
    return fetch(`http://localhost:8080/deleteCategoria/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Delete Categoria:`, data)
        })
        .catch(error => console.error(`Error in Delete Categoria:`, error));
}

async function testDeleteAllCategoria() {
    return fetch(`http://localhost:8080/deleteAllCategoria/1`)
        .then(response => response.json())
        .then(data => console.log(`DeleteAll Categoria:`, data))
        .catch(error => console.error(`Error in Delete Categoria:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  CATEGORÍA  -----------------');
    await testCreateCategoria();
    await testReadCategoria();
    await testUpdateCategoria();
    await testDeleteCategoria();
    await testDeleteAllCategoria();
    console.log('----------------  FIN CATEGORÍA  -----------------');
}