import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS Servicio
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER, 
    tipo TEXT, 
    fechaInicial TEXT, 
    fechaFinal TEXT, 
    estado TEXT, 
    precioAcumulado INTEGER,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
    )`).run();

    try{
        db.prepare(`INSERT INTO Servicio (id, idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado) VALUES(?, ?, ?, ?, ?, ?, ?)`).run(1, 1, 'RESERVA', '00-00-0000', '00-00-0000', 'ENTREGADO', 200);
    } catch{
        console.log('Ya existe.');
    }

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ?`).get(adminID);
    return json.type;
}

export default class $$Servicio {

    static create(idUsuario, tipo, fechaInicial, fechaFinal, estado) {
        let res;
        res = db.prepare(`INSERT INTO Servicio (idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado) VALUES(?, ?, ?, ?, ?, ?)`).run(idUsuario, tipo, fechaInicial, fechaFinal, estado, 0);
        return { 'id': res.lastInsertRowid };
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

    static get(id) {
        let res = db.prepare(`SELECT * FROM Servicio WHERE id = ?`).get(id);
        return res;
    }

    static update(adminID, idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado, id) {
        if (comprobarAdmin(adminID) < 1) throw new Error('No tienes permisos.');
        let res = db.prepare(`UPDATE Servicio SET idUsuario = ?, tipo = ?, fechaInicial = ?, fechaFinal = ?, estado = ?, precioAcumulado = ? WHERE id = ?`).run(idUsuario, tipo, fechaInicial, fechaFinal, estado, precioAcumulado, id);
        return res;

    }

    static delete(adminID, id) {
        if (comprobarAdmin(adminID) < 2) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Servicio WHERE id = ?`).run(id);
        return { 'message': 'OK' };
    }

}