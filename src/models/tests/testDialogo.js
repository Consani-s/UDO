let id;
async function testCreateDialogo() {
    return fetch(`http://localhost:8080/createDialogo/1/1/Hola!`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Dialogo:`, data); 
            id = data.id;
        })
        .catch(error => console.error(`Error in Create Dialogo:`, error));
}

async function testReadDialogo() {
    return fetch(`http://localhost:8080/readDialogo/1`)
        .then(response => response.json())
        .then(data => console.log(`Read Dialogo:`, data))
        .catch(error => console.error(`Error in Read Dialogo:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  DIÁLOGO  -----------------'); 
    await testCreateDialogo();
    await testReadDialogo();
    console.log('----------------  FIN DIÁLOGO  -----------------');
}