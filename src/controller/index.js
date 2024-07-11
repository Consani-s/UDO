import express from 'express';
const server = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import $$Usuario from '../models/Usuario.js';
import $$Producto from '../models/Producto.js';
import $$Imagen from '../models/Imagen.js';
import $$Servicio from '../models/Servicio.js';

server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views')));

// USUARIO
server.get('/loginUser/:user/:pass', function (req, res) {
    try {
        res.status(200).send($$Usuario.login(req.params.user, req.params.pass));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/createUsuario/:adminID/:ced/:num/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send($$Usuario.create(req.params.adminID, req.params.ced, req.params.num, req.params.user, req.params.pass, req.params.type));
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

server.get('/updateUsuario/:adminID/:userID/:newU/:newP/:newT/:newN/:newC', function (req, res) {
    try {
        res.status(200).send($$Usuario.update(req.params.adminID, req.params.userID, req.params.newU, req.params.newP, req.params.newT, req.params.newN, req.params.newC));
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
server.get('/createProducto/:adminID/:nombre/:descrip/:stock/:priceU/:idImage', function (req, res) {
    try {
        res.status(200).send($$Producto.create(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU, req.params.idImage));
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

// IMAGENE
server.post('/createImagen/:adminID', function (req, res) {
    try {
        console.log(req.params.adminID);
        console.log(req.body);
        res.status(200).send($$Imagen.create(req.params.adminID, req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateImagen/:adminID/:idProducto/:id', function (req, res) {
    try {
        res.status(200).send($$Imagen.update(req.params.adminID, req.params.idProducto, req.params.id));
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
// FIN - IMAGENE

// SERVICIO
server.get('/createServicio/:idUsuario/:tipo/:fechaInicial/:fechaFinal/:estado', function (req, res) {
    try {
        res.status(200).send($$Servicio.create(req.params.idUsuario, req.params.tipo, req.params.fechaInicial, req.params.fechaFinal, req.params.estado));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readServicio/:idUsuario', function (req, res) {
    try {
        res.status(200).send($$Servicio.read(req.params.idUsuario));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateServicio/:idUsuario/:tipo/:fechaInicial/:fechaFinal/:estado/:precioAcumulado/:id', function (req, res) {
    try {
        res.status(200).send($$Servicio.update(req.params.idUsuario, req.params.tipo, req.params.fechaInicial, req.params.fechaFinal, req.params.estado, req.params.precioAcumulado, req.params.id));
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

server.listen(8080, function () {
    console.log("- - - ONLINE - - -");
})