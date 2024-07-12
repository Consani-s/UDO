import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Dialogo
    (
    idUsuario INTEGER,
    idServicio INTEGER, 
    mensaje TEXT, 
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idServicio) REFERENCES Servicio(id)
    )`).run();

export default class $$Dialogo {

    static create(idUsuario, idServicio, mensaje) {
        db.prepare(`INSERT INTO Dialogo (idUsuario, idServicio, mensaje) VALUES(?, ?, ?)`).run(idUsuario, idServicio, mensaje);
        return { 'message': 'OK' };
    }

    static read(idServicio) {
        let res = db.prepare(`SELECT * FROM Dialogo WHERE idServicio = ?`).all(idServicio);
        return res;
    }

    static delete(idServicio) {
        db.prepare(`DELETE FROM Dialogo WHERE idServicio = ?`).run(idServicio);
        return { 'message': 'OK' };
    }

}