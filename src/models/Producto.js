import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Producto
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT, 
    descrip TEXT, 
    stock INTEGER, 
    priceU INTEGER
    )`).run();

try{
    db.prepare(`INSERT INTO Producto (id, nombre, descrip, stock, priceU) VALUES(?, ?, ?, ?, ?)`).run(1, 'DELL PRECISION', 'LAPTOP', 999, 400);
} catch{
    console.log('Ya existe.');
}


function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ? AND type = 2`).get(adminID);
    return (json != null);
}

export default class $$Producto {

    static create(adminID, nombre, descrip, stock, priceU) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let id = db.prepare(`INSERT INTO Producto (nombre, descrip, stock, priceU) VALUES(?, ?, ?, ?)`).run(nombre, descrip, stock, priceU);
        return { 'id': id.lastInsertRowid };
    }

    static read(nombre) {
        let res;
        if (nombre == -1) {
            res = db.prepare(`SELECT * FROM Producto`).all();
        } else {
            res = db.prepare(`SELECT * FROM Producto WHERE nombre LIKE ?`).all(`%${nombre}%`);
        }

        return res;
    }

    static get(id) {
        let res = db.prepare(`SELECT * FROM Producto WHERE id = ?`).get(id);
        return res;
    }

    static update(adminID, id, nombre, descrip, stock, priceU) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`UPDATE Producto SET nombre = ?, descrip = ?, stock = ?, priceU = ? WHERE id = ?`).run(nombre, descrip, stock, priceU, id);
        return { 'id': res.lastInsertRowid };

    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Producto WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}