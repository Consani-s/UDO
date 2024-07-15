import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 3;
let suma = 100/tareas;
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
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UNA NUEVA ${chalk.green.bold(`IMAGEN`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            id = data.id;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadImagen() {
    return fetch(`http://localhost:8080/readImagen/${encodeURIComponent(id)}`)
        .then(response => response.blob())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER UNA ${chalk.green.bold(`IMAGEN`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

async function testDeleteImagen() {
    return fetch(`http://localhost:8080/deleteImagen/1/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UNA ${chalk.green.bold(`IMAGEN`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ELIMINAR: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  IMAGEN  -----------------');
    let inicio = new Date();
    await testCreateImagen();
    await testReadImagen();
    await testDeleteImagen();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN IMAGEN  -----------------');
}

runTests();