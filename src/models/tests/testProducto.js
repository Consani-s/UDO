import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 5;
let suma = 100/tareas;
let idProducto;

async function testCreateProducto() {
    return fetch(`http://localhost:8080/createProducto/1/PRODUCTO/PRODUCTO/999/999`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UN NUEVO ${chalk.green.bold(`PRODUCTO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            idProducto = data.id; 
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadProducto() {
    return fetch(`http://localhost:8080/readProducto/-1`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE LEER TODOS LOS ${chalk.green.bold(`PRODUCTOS`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

async function testGetProducto() {
    return fetch(`http://localhost:8080/getProducto/${idProducto}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE OBTENER UN ${chalk.green.bold(`PRODUCTO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL OBTENER: ` + error)));
}

async function testUpdateProducto() {
        return fetch(`http://localhost:8080/updateProducto/1/PRUEBA1/PRUEBA1/888/888`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ACTUALIZAR UN ${chalk.green.bold(`PRODUCTO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ACTUALIZAR: ` + error)));
}

async function testDeleteProducto() {
    return fetch(`http://localhost:8080/deleteProducto/1/${idProducto}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UN ${chalk.green.bold(`PRODUCTO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ELIMINAR: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  PRODUCTO  -----------------'); 
    let inicio = new Date();
    await testCreateProducto();
    await testReadProducto();
    await testGetProducto();
    await testUpdateProducto();
    await testDeleteProducto();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN PRODUCTO  -----------------');
}

runTests();