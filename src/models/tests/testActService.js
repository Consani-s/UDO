import chalk from 'chalk'

let porcentaje = 0;
let hechas = 0;
let tareas = 2;
let suma = 100/tareas;

async function testCreateActService() {
    return fetch(`http://localhost:8080/createActService/1/PRUEBA`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UNA NUEVA ${chalk.green.bold(`ACTUALIZACIÓN DEL SERVICIO`)} EXITOSAMENTE`))
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadActService() {
    return fetch(`http://localhost:8080/readActService/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER DE MANERA ${chalk.green.bold(`EXITOSA`)}`))
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  ACT SERVICE  -----------------');
    let inicio = new Date();
    await testCreateActService();
    await testReadActService();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN ACT SERVICE  -----------------');
}

runTests();