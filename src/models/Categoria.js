import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Categoria
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idProducto INTEGER, 
    tipo TEXT, 
    FOREIGN KEY (idProducto) REFERENCES Producto(id)
    )`).run();

export default class $$Categoria {

    static create(idProducto, tipo) {
        let res = db.prepare(`INSERT INTO Categoria (idProducto, tipo) VALUES(?, ?)`).run(idProducto, tipo);
        return { 'id': res.lastInsertRowid };
    }

    static read(idProducto) {
        if(idProducto==-1){ let res = db.prepare(`SELECT * FROM Categoria`).all(); return res; }
        let res = db.prepare(`SELECT * FROM Categoria WHERE idProducto = ?`).all(idProducto);
        return res;
    }

    static update(tipo, id) {
        db.prepare(`UPDATE Categoria SET tipo = ? WHERE id = ?`).run(tipo, id);
        return { 'message': 'OK' };
    }

    static delete(id) {
        db.prepare(`DELETE FROM Categoria WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

    static deleteAll(idProducto) {
        db.prepare(`DELETE FROM Categoria WHERE idProducto = ?`).run(idProducto);
        return { 'message': 'OK' };
    }

}