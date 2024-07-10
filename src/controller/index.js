import express from 'express';
const server = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import $$Usuarios from '../models/Usuarios.js';
import $$Productos from '../models/Productos.js';
import $$Imagenes from '../models/Imagenes.js';

server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views')));

// USUARIO
server.get('/loginUser/:user/:pass', function (req, res) {
    try {
        res.status(200).send($$Usuarios.login(req.params.user, req.params.pass));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/createUsuario/:adminID/:ced/:num/:user/:pass/:type', function (req, res) {
    try {
        res.status(200).send($$Usuarios.create(req.params.adminID, req.params.ced, req.params.num, req.params.user, req.params.pass, req.params.type));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readUsuario/:adminID/:user', function (req, res) {
    try {
        res.status(200).send($$Usuarios.read(req.params.adminID, req.params.user));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateUsuario/:adminID/:userID/:newU/:newP/:newT/:newN/:newC', function (req, res) {
    try {
        res.status(200).send($$Usuarios.update(req.params.adminID, req.params.userID, req.params.newU, req.params.newP, req.params.newT, req.params.newN, req.params.newC));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteUsuario/:adminID/:userID', function (req, res) {
    try {
        res.status(200).send($$Usuarios.delete(req.params.adminID, req.params.userID));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - USUARIO

// PRODUCTOS
server.get('/createProducto/:adminID/:nombre/:descrip/:stock/:priceU/:idImage', function (req, res) {
    try {
        res.status(200).send($$Productos.create(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU,  req.params.idImage));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readProducto/:nombre', function (req, res) {
    try {
        res.status(200).send($$Productos.read(req.params.nombre));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/getProducto/:id', function (req, res) {
    try {
        res.status(200).send($$Productos.get(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateProducto/:adminID/:nombre/:descrip/:stock/:priceU', function (req, res) {
    try {
        res.status(200).send($$Productos.update(req.params.adminID, req.params.nombre, req.params.descrip, req.params.stock, req.params.priceU));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteProducto/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Productos.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - PRODUCTOS

// IMAGENES
server.post('/createImagen/:adminID', function (req, res) {
    try {
        console.log(req.params.adminID);
        console.log(req.body);
        res.status(200).send($$Imagenes.create(req.params.adminID, req.body));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/updateImagen/:adminID/:idProducto/:id', function (req, res) {
    try {
        res.status(200).send($$Imagenes.update(req.params.adminID, req.params.idProducto, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/readImagen/:id', function (req, res) {
    try {
        res.status(200).send($$Imagenes.read(req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});

server.get('/deleteImagen/:adminID/:id', function (req, res) {
    try {
        res.status(200).send($$Imagenes.delete(req.params.adminID, req.params.id));
    } catch (error) {
        res.status(400).send({ 'message': error.message });
    }
});
// FIN - IMAGENES

server.listen(8080, function(){
    console.log("- - - ONLINE - - -");
})