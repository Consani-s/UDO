let id;
async function testCreateImagen() {
    return fetch(`http://localhost:8080/createImagen/1`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: new ArrayBuffer(8)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Create Imagen:`, data);
            id = data.id;
        })
        .catch(error => console.error(`Error in Create Imagen:`, error));
}

async function testReadImagen() {
    return fetch(`http://localhost:8080/readImagen/${encodeURIComponent(id)}`)
        .then(response => response.blob())
        .then(data => console.log(`Read Imagen:`, data))
        .catch(error => console.error(`Error in Read Imagen:`, error));
}

async function testDeleteImagen() {
    return fetch(`http://localhost:8080/deleteImagen/1/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => console.log(`Delete Imagen:`, data))
        .catch(error => console.error(`Error in Delete Imagen:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  IMAGEN  -----------------');
    await testCreateImagen();
    await testReadImagen();
    await testDeleteImagen();
    console.log('----------------  FIN IMAGEN  -----------------');
}