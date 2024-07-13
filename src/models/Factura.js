import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Factura
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    fecha TEXT, 
    idEmisor INTEGER,
    nombreVendedor TEXT, 
    idRemitente INTEGER,
    precioTotal INTEGER, 
    FOREIGN KEY (idEmisor) REFERENCES Usuario(id),
    FOREIGN KEY (idRemitente) REFERENCES Usuario(id)
    )`).run();

    function comprobarAdmin(adminID) {
        let json = db.prepare(`SELECT * FROM Usuario WHERE id = ?`).get(adminID);
        return json.type;
    }

export default class $$Factura {

    static create(adminID, idEmisor, nombreVendedor, idRemitente, precioTotal) {
        if (comprobarAdmin(adminID) < 1) throw new Error('No tienes permisos.');
        let fecha = new Date();
        let fechaActual = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear()
        let id = db.prepare(`INSERT INTO Factura (fecha, idEmisor, nombreVendedor, idRemitente, precioTotal) VALUES(?, ?, ?, ?, ?)`).run(fechaActual, idEmisor, nombreVendedor, idRemitente, precioTotal);
        return { 'id': id.lastInsertRowid };
    }

    static read(idRemitente) {
        let res;
        if (idRemitente == -1) {
            res = db.prepare(`SELECT * FROM Factura`).all();
        } else {
            res = db.prepare(`SELECT * FROM Factura WHERE idRemitente = ?`).all(idRemitente);
        }

        return res;
    }

    static get(id) {
        let res = db.prepare(`SELECT * FROM Factura WHERE id = ?`).get(id);
        return res;
    }

    static delete(adminID, id) {
        if (comprobarAdmin(adminID) < 2) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Factura WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}