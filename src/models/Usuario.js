import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(
    `CREATE TABLE IF NOT EXISTS Usuario 
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    ced TEXT,
    nombreCompleto TEXT, 
    num TEXT, 
    usuario TEXT UNIQUE, 
    pass TEXT, 
    type INTEGER
    )`).run();

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ? AND type = 2`).get(adminID);
    return (json != null);
}

export default class $$Usuario {

    static create(adminID, ced, num, user, pass, type) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user.trim().length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (pass.trim().length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');

        try{
            db.prepare(`INSERT INTO Usuario (ced, num, usuario, pass, type) VALUES(?, ?, ?, ?, ?)`).run(ced.trim(), num.trim(), user.trim(), pass.trim(), type);
        } catch (err){
            let cadena = err.message.split(' ');
            if(cadena[0] == 'UNIQUE') throw new Error('Este usuario ya existe.');
        }
        

        return { 'message': 'OK' };
    }

    static read(adminID, user) {
        let res
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if(user == -1){
            res = db.prepare(`SELECT * FROM Usuario`).all();
        } else {
            res = db.prepare(`SELECT * FROM Usuario WHERE usuario LIKE ?`).all(`%${user}%`);
        }
        
        return res;
    }

    static update(adminID, userID, newU, newP, newT, newN, newC) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (newU.length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (newP.length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');
        let res = db.prepare(`UPDATE Usuario SET usuario = ?, pass = ?, type = ?, num = ?, ced = ? WHERE id = ?`).run(newU, newP, newT, newN, newC, userID);
        return res;

    }

    static delete(adminID, userID) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Usuario WHERE id = ?`).run(userID);
        return { 'message': 'OK' };

    }

    static login(user, pass) {
        let json = db.prepare(`SELECT * FROM Usuario WHERE usuario = ?`).get(user);
        if (json) {

            if (json.pass == pass) {
                return { 'message': 'OK' };
            } else {
                throw new Error('El usuario o contraseña son incorrectos.');
            }

        } else {
            throw new Error('Usuario o contraseñas inválidos.');
        }
    }

}