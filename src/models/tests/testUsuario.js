import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 6;
let suma = 100/tareas;
let idUsuario;

async function testCreateUsuario() {
    return fetch(`http://localhost:8080/createUsuario/1/33333333/PRUEBA PRUEBA/04120000000/prueba/prueba/2`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UN NUEVO ${chalk.green.bold(`USUARIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            idUsuario = data.id; 
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadUsuario() {
    return fetch(`http://localhost:8080/readUsuario/${encodeURIComponent(idUsuario)}/-1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER TODOS LOS ${chalk.green.bold(`USUARIOS`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

async function testGetUsuario() {
    return fetch(`http://localhost:8080/getUsuario/${encodeURIComponent(idUsuario)}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE OBTENER UN ${chalk.green.bold(`USUARIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL OBTENER: ` + error)));
}

async function testUpdateUsuario() {
        return fetch(`http://localhost:8080/updateUsuario/${idUsuario}/${idUsuario}/11111111/PRUEBA2 PRUEBA2/04120875907/prueba/prueba/2`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ACTUALIZAR UN ${chalk.green.bold(`USUARIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ACTUALIZAR: ` + error)));
}

async function testDeleteUsuario() {
    return fetch(`http://localhost:8080/deleteUsuario/${encodeURIComponent(idUsuario)}/${encodeURIComponent(idUsuario)}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UN ${chalk.green.bold(`USUARIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ALIMINAR: ` + error)));
}

async function testLoginUsuario() {
    return fetch(`http://localhost:8080/loginUser/prueba/prueba`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LOGGEAR UN ${chalk.green.bold(`USUARIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN EL LOGIN: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  USUARIO  -----------------');
    let inicio = new Date();
    await testCreateUsuario();
    await testGetUsuario()
    await testLoginUsuario();
    await testReadUsuario();
    await testUpdateUsuario();
    await testDeleteUsuario();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje.toFixed(0) + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN USUARIO  -----------------');
}

runTests();