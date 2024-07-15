import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS FacturaProducto
    (
    idFactura INTEGER,
    idProducto INTEGER,
    cantidad INTEGER,
    precioTotal INTEGER,
    FOREIGN KEY (idFactura) REFERENCES Factura(id) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Producto(id)
    )`).run();

    function comprobarAdmin(adminID) {
        let json = db.prepare(`SELECT * FROM Usuario WHERE id = ?`).get(adminID);
        return json.type;
    }

export default class $$FacturaProducto {

    static create(adminID, idFactura, idProducto, cantidad, precioTotal) {
        if (comprobarAdmin(adminID) < 1) throw new Error('No tienes permisos.');
        db.prepare(`INSERT INTO FacturaProducto (idFactura, idProducto, cantidad, precioTotal) VALUES(?, ?, ?, ?)`).run(idFactura, idProducto, cantidad, precioTotal);
        return { 'message': 'OK' };
    }

    static read(idFactura) {
        let res = db.prepare(`SELECT * FROM FacturaProducto WHERE idFactura = ?`).all(idFactura);
        return res;
    }

}