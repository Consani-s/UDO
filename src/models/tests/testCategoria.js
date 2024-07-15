import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 5;
let suma = 100/tareas;
let id;

async function testCreateCategoria() {
    return fetch(`http://localhost:8080/createCategoria/1/LAPTOP`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UNA NUEVA ${chalk.green.bold(`CATEGORÍA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            id = data.id;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadCategoria() {
    return fetch(`http://localhost:8080/readCategoria/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER DE MANERA ${chalk.green.bold(`EXITOSA`)}`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA` + error)));
}

async function testUpdateCategoria() {
    return fetch(`http://localhost:8080/updateCategoria/PRUEBA/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ACTUALIZAR UNA ${chalk.green.bold(`CATEGORÍA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA ACTUALIZACIÓN: ` + error)));
}

async function testDeleteCategoria() {
    return fetch(`http://localhost:8080/deleteCategoria/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UNA ${chalk.green.bold(`CATEGORÍA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA ELIMINACIÓN: ` + error)));
}

async function testDeleteAllCategoria() {
    return fetch(`http://localhost:8080/deleteAllCategoria/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR TODAS LAS ${chalk.green.bold(`CATEGORÍAS`)} DE UN PRODUCTO EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA ELIMINACIÓN TOTAL: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  CATEGORÍA  -----------------');
    let inicio = new Date();
    await testCreateCategoria();
    await testReadCategoria();
    await testUpdateCategoria();
    await testDeleteCategoria();
    await testDeleteAllCategoria();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN CATEGORÍA  -----------------');
}

runTests();