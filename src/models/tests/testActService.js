async function testCreateActService() {
    return fetch(`http://localhost:8080/createActService/1/PRUEBA`)
        .then(response => response.json())
        .then(data => console.log(`Create ActService:`, data))
        .catch(error => console.error(`Error in Create ActService:`, error));
}

async function testReadActService() {
    return fetch(`http://localhost:8080/readActService/1`)
        .then(response => response.json())
        .then(data => console.log(`Read ActService:`, data))
        .catch(error => console.error(`Error in Read ActService:`, error));
}

// Ejecutar los tests
export default async function runTests() {
    console.log('----------------  ACT SERVICE  -----------------');
    await testCreateActService();
    await testReadActService();
    console.log('----------------  FIN ACT SERVICE  -----------------');
}