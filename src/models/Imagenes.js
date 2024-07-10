import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Imagenes 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    data BLOB, 
    idProducto INTEGER, 
    FOREIGN KEY (idProducto) REFERENCES Productos(id) ON DELETE CASCADE)`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuarios WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class $$Imagenes {

    static create(adminID, buff) {
        console.log('-------------SERVER-------------');
        console.log(adminID);
        console.log(buff);
        let buffer = Buffer.from(buff)
        console.log(buffer);
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`INSERT INTO Imagenes (data) VALUES(?)`).run(buffer);
        console.log('-------------FIN/SERVER-------------');
        return { 'id': res.lastInsertRowid };
    }

    static update(adminID, idProducto, id){
        console.log('-------------SERVER-------------');
        console.log(adminID, idProducto, id);
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`UPDATE Imagenes SET idProducto = ? WHERE id = ?`).run(idProducto, id);
        console.log('-------------FIN/SERVER-------------');
        return {'res': res.changes};
    }

    static read(id) {
        let res = db.prepare(`SELECT * FROM Imagenes WHERE idProducto = ?`).get(id);
        return res.data;
    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`DELETE FROM Imagenes WHERE id = ?`).run(id);
        return res;
    }


}