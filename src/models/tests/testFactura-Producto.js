import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 2;
let suma = 100/tareas;
let id;

async function testCreateFacturaProducto() {
    return fetch(`http://localhost:8080/createFacturaProducto/1/1/1/99/999`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UNA NUEVA ${chalk.green.bold(`FACTURA-PRODUCTO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            id = data.id; 
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadFacturaProdcuto() {
    return fetch(`http://localhost:8080/readFacturaProducto/1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER LOS ${chalk.green.bold(`PRODUCTOS DE LA FACTURA`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  FACTURA-PRODUCTO  -----------------');
    let inicio = new Date();
    await testCreateFacturaProducto();
    await testReadFacturaProdcuto();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN FACTURA-PRODUCTO  -----------------');
}

runTests();