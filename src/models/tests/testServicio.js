import chalk from 'chalk';

let porcentaje = 0;
let hechas = 0;
let tareas = 5;
let suma = 100/tareas;
let idServicio;

async function testCreateServicio() {
    return fetch(`http://localhost:8080/createServicio/1/RESERVA/00-00-0000/00-00-0000/ENTREGADO`)
        .then(response => response.json())
        .then(data => { 
            console.log(chalk.green(`✔️ `+ `PERMITE CREAR UN NUEVO ${chalk.green.bold(`SERVICIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
            idServicio = data.id; 
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA CREACIÓN: ` + error)));
}

async function testReadServicio() {
    return fetch(`http://localhost:8080/readServicio/-1`)
        .then(response => response.json())
        .then(data =>{
            console.log(chalk.green(`✔️ `+ `PERMITE LEER TODOS LOS ${chalk.green.bold(`SERVICIOS`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR EN LA LECTURA: ` + error)));
}

async function testGetServicio() {
    return fetch(`http://localhost:8080/getServicio/${idServicio}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE OBTENER UN ${chalk.green.bold(`SERVICIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL OBTENER: ` + error)));
}

async function testUpdateServicio() {
        return fetch(`http://localhost:8080/updateServicio/1/1/TÉCNICO/11-11-1111/11-11-1111/PAGADO/444/${idServicio}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ACTUALIZAR UN ${chalk.green.bold(`SERVICIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ACTUALIZAR: ` + error)));
}

async function testDeleteServicio() {
    return fetch(`http://localhost:8080/deleteServicio/1/${idServicio}`)
        .then(response => response.json())
        .then(data => {
            console.log(chalk.green(`✔️ `+ `PERMITE ELIMINAR UN ${chalk.green.bold(`SERVICIO`)} EXITOSAMENTE`));
            porcentaje = porcentaje + suma;
            hechas++;
        })
        .catch(error => console.error(chalk.red(`⚠️ `+ `ERROR AL ELIMINAR: ` + error)));
}

// Ejecutar los tests
export default async function runTests() {
    console.log();
    console.log('----------------  SERVICIO  ----------------'); 
    let inicio = new Date();
    await testCreateServicio();
    await testReadServicio();
    await testGetServicio();
    await testUpdateServicio();
    await testDeleteServicio();
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms' + ' | ' + `${chalk.yellow('%: ')}` + porcentaje + ' | ' + `${chalk.yellow('Tests Completados: ')}` + hechas + ' de ' + tareas);
    console.log('----------------  FIN SERVICIO  -----------------');
}

runTests();