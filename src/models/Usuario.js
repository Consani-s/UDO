import sqlite from 'better-sqlite3';

const db = new sqlite('../controller/database.db');

db.prepare(
    `CREATE TABLE IF NOT EXISTS Usuario 
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    ced TEXT UNIQUE,
    nombreCompleto TEXT, 
    num TEXT, 
    usuario TEXT UNIQUE, 
    pass TEXT, 
    type INTEGER
    )`).run();

    try{
        db.prepare(`INSERT INTO Usuario (ced, nombreCompleto, num, usuario, pass, type) VALUES(?, ?, ?, ?, ?, ?)`).run('30440074', 'ANDRÉS JESÚS GARCÍA CONSANI', '0412-0875907', 'admin', 'admin', 2);
    } catch{
        console.log('Ya existe.');
    }

function comprobarAdmin(adminID) {
    let json = db.prepare(`SELECT * FROM Usuario WHERE id = ? AND type = 2`).get(adminID);
    return (json != null);
}

export default class $$Usuario {

    static login(user, pass) {
        let json = db.prepare(`SELECT * FROM Usuario WHERE usuario = ?`).get(user);
        if (json) {

            if (json.pass == pass) {
                return { 'id': json.id };
            } else {
                throw new Error('El usuario o contraseña son incorrectos.');
            }

        } else {
            throw new Error('Usuario o contraseñas inválidos.');
        }
            }

    static create(adminID, ced, nombreCompleto, num, user, pass, type) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user.trim().length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (pass.trim().length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');
        let res;
        try{
            res = db.prepare(`INSERT INTO Usuario (ced, nombreCompleto, num, usuario, pass, type) VALUES(?, ?, ?, ?, ?, ?)`).run(ced.trim(), nombreCompleto.trim(), num.trim(), user.trim(), pass.trim(), type);
        } catch (err){
            let cadena = err.message.split(' ');
            if(cadena[0] == 'UNIQUE') throw new Error('Este usuario ya existe.');
        }
        

        return { 'id': res.lastInsertRowid };
    }

    static getByCed(ced){
        return db.prepare(`SELECT * FROM Usuario WHERE ced = ?`).get(ced);
    }

    static get(id){
        return db.prepare(`SELECT * FROM Usuario WHERE id = ?`).get(id);
    }

    static read(adminID, nombreCompleto) {
        let res;
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if(nombreCompleto == -1){
            res = db.prepare(`SELECT * FROM Usuario`).all();
        } else {
            res = db.prepare(`SELECT * FROM Usuario WHERE nombreCompleto LIKE ?`).all(`%${nombreCompleto}%`);
        }
        
        return res;
    }

    static update(adminID, id, ced, nombreCompleto, num, user, pass, type) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        if (user.length < 3) throw new Error('El nombre de usuario debe tener como mínimo 3 caracteres.');
        if (pass.length < 6) throw new Error('La contraseña debe tener como mínimo 6 caracteres.');
        let res = db.prepare(`UPDATE Usuario SET ced = ?, nombreCompleto = ?, num = ?, usuario = ?, pass = ?, type = ? WHERE id = ?`).run(ced, nombreCompleto, num, user, pass, type, id);
        return res;

    }

    static delete(adminID, userID) {
        if (!comprobarAdmin(adminID)) throw new Error('No tienes permisos.');
        db.prepare(`DELETE FROM Usuario WHERE id = ?`).run(userID);
        return { 'message': 'OK' };

    }

}