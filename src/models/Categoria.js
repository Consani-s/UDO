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
        db.prepare(`INSERT INTO Categoria (idProducto, tipo) VALUES(?, ?)`).run(idProducto, tipo);
        return { 'message': 'OK' };
    }

    static read(idProducto) {
        let res = db.prepare(`SELECT * FROM Categoria WHERE idProducto = ?`).all(idProducto);
        return res;
    }

    static update(tipo, id) {
        let res = db.prepare(`UPDATE Categoria SET tipo = ? WHERE id = ?`).all(tipo, id);
        return res;
    }

    static delete(id) {
        db.prepare(`DELETE FROM Categoria WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}