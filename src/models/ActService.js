import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS ActualizacionServicio
    (
    idServicio INTEGER, 
    mensaje TEXT, 
    FOREIGN KEY (idServicio) REFERENCES Servicio(id)
    )`).run();

export default class $$ActualizacionServicio {

    static create(idServicio, mensaje) {
        db.prepare(`INSERT INTO ActualizacionServicio (idServicio, mensaje) VALUES(?, ?)`).run(idServicio, mensaje);
        return { 'message': 'OK' };
    }

    static read(idUsuario) {
        let res = db.prepare(`SELECT * FROM ActualizacionServicio WHERE idServicio = ?`).all(idUsuario);
        return res;
    }

    static delete(idServicio) {
        db.prepare(`DELETE FROM ActualizacionServicio WHERE idServicio = ?`).run(idServicio);
        return { 'message': 'OK' };
    }

}