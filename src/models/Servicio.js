import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Servicio
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER, 
    tipo TEXT, 
    fechaInicial TEXT, 
    fechaFinal TEXT, 
    estado TEXT, 
    precioAcumulado INTEGER,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
    )`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ? AND type = 1`).get(adminID);
    return (json != null);
}

export default class $$Servicio {

    static create(idUsuario, tipo, fechaInicial, fechaFinal, estado) {
        db.prepare(`INSERT INTO Servicio (idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado) VALUES(?, ?, ?, ?, ?, ?)`).run(idUsuario, tipo, fechaInicial, fechaFinal, estado, 0);
        return { 'message': 'OK' };
    }

    static read(idUsuario) {
        let res;
        if (idUsuario == -1) {
            res = db.prepare(`SELECT * FROM Servicio`).all();
        } else {
            res = db.prepare(`SELECT * FROM Servicio WHERE idUsuario = ?`).all(idUsuario);
        }

        return res;
    }

    static update(idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        let res = db.prepare(`UPDATE Servicio SET idUsuario = ?, tipo = ?, fechaInicial = ?, fechaFinal = ?, estado = ?, precioAcumulado = ? WHERE id = ?`).run(idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado, id);
        return res;

    }

    static delete(adminID, id) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Servicio WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}