import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 2;
let suma = 100/tareas;
let id;

async function testCreateDialogo() {
    return fetch(`http://localhost:8080/createDialogo/1/1/Hola!`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UN NUEVO ${chalk.green.bold(`DIÁLOGO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            id = data.id;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadDialogo() {
    return fetch(`http://localhost:8080/readDialogo/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER LOS ${chalk.green.bold(`DIÁLOGOS`)} DE UN SERVICIO EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  DIÁLOGO  -----------------'); 
    let inicio = new Date();
    await testCreateDialogo();
    await testReadDialogo();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN DIÁLOGO  -----------------');
}

runTests();