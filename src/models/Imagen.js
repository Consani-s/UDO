import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Imagen 
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    data BLOB, 
    idProducto INTEGER, 
    FOREIGN KEY (idProducto) REFERENCES Producto(id) ON DELETE CASCADE
    )`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ? AND type = 2`).get(adminID);
    return (json != null);
}

export default class $$Imagen {

    static create(adminID, buff) {
        let buffer = Buffer.from(buff)
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`INSERT INTO Imagen (data) VALUES(?)`).run(buffer);
        return { 'id': res.lastInsertRowid };
    }

    static read(id) {
        let res = db.prepare(`SELECT * FROM Imagen WHERE idProducto = ?`).get(id);
        return res.data;
    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`DELETE FROM Imagen WHERE id = ?`).run(id);
        return res;
    }


}