let idUsuario;

async function testCreateUsuario() {
    return fetch(`http://localhost:8080/createUsuario/1/33333333/PRUEBA PRUEBA/04120000000/prueba/prueba/2`)
        .then(response => response.json())
        .then(data => { 
            console.log(`Create Usuario:`, data); 
            idUsuario = data.id; 
        })
        .catch(error => console.error(`Error in Create Usuario:`, error));
}

async function testReadUsuario() {
    return fetch(`http://localhost:8080/readUsuario/${encodeURIComponent(idUsuario)}/-1`)
        .then(response => response.json())
        .then(data => console.log(`Read Usuario:`, data))
        .catch(error => console.error(`Error in Read Usuario:`, error));
}

async function testGetUsuario() {
    return fetch(`http://localhost:8080/getUsuario/${encodeURIComponent(idUsuario)}`)
        .then(response => response.json())
        .then(data => console.log(`Get Usuario:`, data))
        .catch(error => console.error(`Error in Get Usuario:`, error));
}

async function testUpdateUsuario() {
        return fetch(`http://localhost:8080/updateUsuario/${idUsuario}/${idUsuario}/11111111/PRUEBA2 PRUEBA2/04120875907/prueba/prueba/2`)
        .then(response => response.json())
        .then(data => console.log(`Update Usuario:`, data))
        .catch(error => console.error(`Error in Update Usuario:`, error));
}

async function testDeleteUsuario() {
    return fetch(`http://localhost:8080/deleteUsuario/${encodeURIComponent(idUsuario)}/${encodeURIComponent(idUsuario)}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Delete Usuario:`, data)
        })
        .catch(error => console.error(`Error in Delete Usuario:`, error));
}

async function testLoginUsuario() {
    return fetch(`http://localhost:8080/loginUser/prueba/prueba`)
        .then(response => response.json())
        .then(data => console.log(`Login Usuario:`, data))
        .catch(error => console.error(`Error in Login Usuario:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  USUARIO  -----------------');
    await testCreateUsuario();
    await testGetUsuario()
    await testLoginUsuario();
    await testReadUsuario();
    await testUpdateUsuario();
    await testDeleteUsuario();
    console.log('----------------  FIN USUARIO  -----------------');
}