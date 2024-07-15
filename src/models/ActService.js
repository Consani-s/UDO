import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS ActualizacionServicio
    (
    idServicio INTEGER, 
    mensaje TEXT, 
    FOREIGN KEY (idServicio) REFERENCES Servicio(id) ON DELETE CASCADE
    )`).run();

export default class $$ActService {

    static create(idServicio, mensaje) {
        db.prepare(`INSERT INTO ActualizacionServicio (idServicio, mensaje) VALUES(?, ?)`).run(idServicio, mensaje);
        return { 'message': 'OK' };
    }

    static read(idServicio) {
        let res = db.prepare(`SELECT * FROM ActualizacionServicio WHERE idServicio = ?`).all(idServicio);
        return res;
    }

}