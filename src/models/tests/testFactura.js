import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 4;
let suma = 100/tareas;
let idFactura;

async function testCreateFactura() {
    return fetch(`http://localhost:8080/createFactura/1/1/Vendedor/1/1000`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UNA NUEVA ${chalk.green.bold(`FACTURA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            idFactura = data.id; 
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadFactura() {
    return fetch(`http://localhost:8080/readFactura/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER TODAS LAS ${chalk.green.bold(`FACTURAS`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

async function testGetFactura() {
    return fetch(`http://localhost:8080/getFactura/${idFactura}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE OBTENER UNA ${chalk.green.bold(`FACTURA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL OBTENER: ` + error)));
}

async function testDeleteFactura() {
    return fetch(`http://localhost:8080/deleteFactura/1/${idFactura}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UNA ${chalk.green.bold(`FACTURA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ELIMINAR: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  FACTURA  -----------------'); 
    let inicio = new Date();
    await testCreateFactura();
    await testReadFactura();
    await testGetFactura();
    await testDeleteFactura();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN FACTURA  -----------------');
}

runTests();