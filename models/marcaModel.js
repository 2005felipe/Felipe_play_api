const db = require('../config/db');

const marcaModel = {
    getMarcas: (callback) => {
        const query = `
            SELECT id, nombre, pais_origen
            FROM marcas;
        `;
        db.query(query, callback);
    },

    getMarcaById: (id, callback) => {
        const query = 'SELECT * FROM marcas WHERE id = ?';
        db.query(query, [id], callback);
    },

    postMarca: (datos, callback) => {
        const query = 'INSERT INTO marcas SET ?';
        db.query(query, [datos], callback);
    },

    putMarca: (id, datos, callback) => {
        const query = 'UPDATE marcas SET ? WHERE id = ?';
        db.query(query, [datos, id], callback);
    },

    deleteMarca: (id, callback) => {
        const query = 'DELETE FROM marcas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = marcaModel;
