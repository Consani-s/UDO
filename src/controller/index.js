let inicio = new Date();
import express from 'express';
const server = express();
import bodyParser from 'body-parser';
import PDFDocument from 'pdfkit-table'
import path from 'path';
import cors from 'cors';
import chalk from 'chalk';

import $$Usuario from '../models/Usuario.js';
import $$Producto from '../models/Producto.js';
import $$Imagen from '../models/Imagen.js';
import $$Servicio from '../models/Servicio.js';
import $$Dialogo from '../models/Dialogo.js';
import $$ActService from '../models/ActService.js';
import $$Categoria from '../models/Categoria.js';
import $$Factura from '../models/Factura.js';
import $$FacturaProducto from '../models/Factura-Producto.js';

server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'examples')));
server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views')));
server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'forms')));
server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'scripts')));
server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views', 'intranet')));
server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'img')));

server.get('/pdf/:tipo', function (req, res) {
    const doc = new PDFDocument();
    doc.pipe(res);

    let usuarios = [];
    if (req.params.tipo == 'cliente') {
        fetch(`http://localhost:6060/readUsuario/1/-1`)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    usuarios.push(element)
                });
                return usuarios;
            })
            .then(async usuarios => {
                let facturas = [];
                for (let i = 0; i < usuarios.length; i++) {
                    await fetch(`http://localhost:6060/readFactura/${encodeURIComponent(usuarios[i].id)}`)
                        .then(response => response.json())
                        .then(data => {
                            facturas.push(data.length);
                        })
                };
                return facturas;
            })
            .then(facturas => {
                let cambios = 0;
                do {
                    cambios = 0;
                    if (usuarios.length == 1) break;
                    for (let i = 0; i < (usuarios.length - 1); i++) {
                        if (facturas[i] < facturas[i + 1]) {
                            let aux = facturas[i + 1];
                            facturas[i + 1] = facturas[i];
                            facturas[i] = aux;
                            aux = usuarios[i + 1];
                            usuarios[i + 1] = usuarios[i];
                            usuarios[i] = aux;
                            cambios++;
                        }
                    }
                } while (cambios > 0);

                let rows = [];
                for (let i = 0; i < usuarios.length; i++) {
                    rows.push([usuarios[i].id, usuarios[i].ced, usuarios[i].nombreCompleto, usuarios[i].num, usuarios[i].type, facturas[i]])
                }

                doc.text('CLIENTES CON MÁS FACTURAS.');

                doc.moveDown();
                const table = {
                    headers: ['ID', 'Cédula', 'Nombre', 'Número', 'Tipo', 'N° Facturas'],
                    rows: rows,
                };

                doc.table(table, {
                    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
                    prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
                });
                
                doc.end();
            })
            .catch(error => console.error(chalk.red(`⚠️ ` + `ERROR EN LA LECTURA: ` + error)));
    } else if (req.params.tipo == 'producto'){
        let productos = [];
        fetch(`http://localhost:6060/readProducto/-1`)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    productos.push(element)
                });
                return productos;
            })
            .then(async lista => {
                let cantidades = [];
                for (let i = 0; i < lista.length; i++){
                    await fetch(`http://localhost:6060/readFacturaProductoProducto/${lista[i].id}`)
                    .then(response => response.json())
                    .then(element => {
                        if(element.length == 0){cantidades[i] = 0; return;};
                        element.forEach(element => {
                            cantidades[i] = (cantidades[i] || 0) + element.cantidad;
                        })
                    });
                }
                return {'productos': lista, 'cantidades':cantidades}
            })
            .then(data => {
                let cambios = 0;
                do {
                    cambios = 0;
                    if (data.productos.length == 1) break;
                    for (let i = 0; i < (data.productos.length - 1); i++) {
                        if (data.cantidades[i] < data.cantidades[i + 1]) {
                            let aux = data.cantidades[i + 1];
                            data.cantidades[i + 1] = data.cantidades[i];
                            data.cantidades[i] = aux;
                            aux = data.productos[i + 1];
                            data.productos[i + 1] = data.productos[i];
                            data.productos[i] = aux;
                            cambios++;
                        }
                    }
                } while (cambios > 0);
                
                let rows = [];
                for (let i = 0; i < data.productos.length; i++) {
                        rows.push([data.productos[i].id, 
                            data.productos[i].nombre, 
                            data.productos[i].descrip, 
                            data.productos[i].stock, 
                            data.productos[i].priceU, 
                            data.cantidades[i]]);
                }

                doc.text('PRODUCTOS MÁS VENDIDOS.');

                doc.moveDown();
                const table = {
                    headers: ['ID', 'Nombre', 'Descripción', 'Stock', 'Precio c/u', 'N° Ventas'],
                    rows: rows,
                };

                doc.table(table, {
                    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
                    prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
                });

                doc.end();
            })
        } else {
            res.status(400).send('Error en el tipo de reporte.')
        }
    //localhost:6060/pdf/cliente
});

// Factura-Producto
server.get('/createFacturaProducto/:adminID/:idFactura/:idProducto/:cantidad/:precioTotal', function (req, res) {
    try {
        res.status(200).send($$FacturaProducto.create(req.params.adminID, req.params.idFactura, req.params.idProducto, req.params.cantidad, req.params.precioTotal));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readFacturaProductoProducto/:idProducto', function (req, res) {
    try {
        res.status(200).send($$FacturaProducto.readProducto(req.params.idProducto));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readFacturaProducto/:idFactura', function (req, res) {
    try {
        res.status(200).send($$FacturaProducto.read(req.params.idFactura));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - Factura-Producto

// Factura
server.get('/createFactura/:adminID/:idEmisor/:nombreVendedor/:idRemitente/:precioTotal', function (req, res) {
    try {
        res.status(200).send($$Factura.create(req.params.adminID, req.params.idEmisor, req.params.nombreVendedor, req.params.idRemitente, req.params.precioTotal));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readFactura/:idRemitente', function (req, res) {
    try {
        res.status(200).send($$Factura.read(req.params.idRemitente));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getFactura/:id', function (req, res) {
    try {
        res.status(200).send($$Factura.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteFactura/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Factura.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - Factura

// USUARIO
server.get('/loginUser/:user/:pass', function (req, res) {
    try {
        res.status(200).send($$Usuario.login(req.params.user, req.params.pass));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getUsuario/:id', function (req, res) {
    try {
        res.status(200).send($$Usuario.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getUsuarioByCED/:ced', function (req, res) {
    try {
        res.status(200).send($$Usuario.getByCed(req.params.ced));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/createUsuario/:adminID/:ced/:nombreCompleto/:num/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send($$Usuario.create(req.params.adminID, req.params.ced, req.params.nombreCompleto, req.params.num, req.params.user, req.params.pass, req.params.type));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readUsuario/:adminID/:user', function (req, res) {
    try {
        res.status(200).send($$Usuario.read(req.params.adminID, req.params.user));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateUsuario/:adminID/:id/:ced/:nombreCompleto/:num/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send($$Usuario.update(req.params.adminID, req.params.id, req.params.ced, req.params.nombreCompleto, req.params.num, req.params.user, req.params.pass, req.params.type));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteUsuario/:adminID/:userID', function (req, res) {
    try {
        res.status(200).send($$Usuario.delete(req.params.adminID, req.params.userID));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - USUARIO

// PRODUCTO
server.get('/createProducto/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
    try {
        res.status(200).send($$Producto.create(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.post('/createProductoWithImage/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
    try {
        res.status(200).send($$Producto.createWithImage(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU, req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readProducto/:nombre', function (req, res) {
    try {
        res.status(200).send($$Producto.read(req.params.nombre));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readProductoByCategoria/:tipo/:nombre', function (req, res) {
    try {
        res.status(200).send($$Producto.readByCategoria(req.params.tipo, req.params.nombre));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getProducto/:id', function (req, res) {
    try {
        res.status(200).send($$Producto.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateProducto/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
    try {
        res.status(200).send($$Producto.update(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteProducto/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Producto.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - PRODUCTO

// IMAGEN
server.post('/createImagen/:adminID/:idProducto', function (req, res) {
    try {
        res.status(200).send($$Imagen.create(req.params.adminID, req.body, req.params.idProducto));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readImagen/:id', function (req, res) {
    try {
        res.status(200).send($$Imagen.read(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteImagen/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Imagen.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - IMAGEN

// SERVICIO
server.get('/createServicio/:idUsuario/:tipo/:fechaInicial/:fechaFinal/:estado', function (req, res) {
    try {
        res.status(200).send($$Servicio.create(req.params.idUsuario, req.params.tipo, req.params.fechaInicial, req.params.fechaFinal, req.params.estado));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readServicio/:adminID/:idUsuario', function (req, res) {
    try {
        res.status(200).send($$Servicio.read(req.params.adminID, req.params.idUsuario));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getServicio/:id', function (req, res) {
    try {
        res.status(200).send($$Servicio.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateServicio/:adminID/:idUsuario/:tipo/:fechaInicial/:fechaFinal/:estado/:precioAcumulado/:id', function (req, res) {
    try {
        res.status(200).send($$Servicio.update(req.params.adminID, req.params.idUsuario, req.params.tipo, req.params.fechaInicial, req.params.fechaFinal, req.params.estado, req.params.precioAcumulado, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteServicio/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Servicio.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - SERVICIO

// DIALOGO
server.get('/createDialogo/:idUsuario/:idServicio/:mensaje', function (req, res) {
    try {
        res.status(200).send($$Dialogo.create(req.params.idUsuario, req.params.idServicio, req.params.mensaje));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readDialogo/:idServicio', function (req, res) {
    try {
        res.status(200).send($$Dialogo.read(req.params.idServicio));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - DIALOGO

// ActService
server.get('/createActService/:idServicio/:mensaje', function (req, res) {
    try {
        res.status(200).send($$ActService.create(req.params.idServicio, req.params.mensaje));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readActService/:idServicio', function (req, res) {
    try {
        res.status(200).send($$ActService.read(req.params.idServicio));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - ActService

// Categoria
server.get('/createCategoria/:idProducto/:tipo', function (req, res) {
    try {
        res.status(200).send($$Categoria.create(req.params.idProducto, req.params.tipo));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readCategoria/:idProducto', function (req, res) {
    try {
        res.status(200).send($$Categoria.read(req.params.idProducto));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateCategoria/:tipo/:id', function (req, res) {
    try {
        res.status(200).send($$Categoria.update(req.params.tipo, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteCategoria/:id', function (req, res) {
    try {
        res.status(200).send($$Categoria.delete(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteAllCategoria/:idProducto', function (req, res) {
    try {
        res.status(200).send($$Categoria.deleteAll(req.params.idProducto));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - Categoria

server.listen(6060, function () {
    console.log(chalk.gray.bold('-------------------  SERVER -------------------'));
    console.log(chalk.yellow.bold('✔️ ') + chalk.green.italic('EL SERVIDOR SE EJECUTÓ EXITOSAMENTE'));
    console.log(chalk.yellow.bold('✔️ ') + chalk.green.italic('SE REALIZÓ LA CONEXIÓN AL SERVIDOR SIN ERRORES'));
    console.log(`${chalk.yellow('Time: ')}` + (new Date() - inicio) + 'ms');
    console.log(chalk.gray.bold('-------------------  SERVER -------------------'));
})