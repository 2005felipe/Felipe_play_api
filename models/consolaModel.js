const db = require('../config/db');

const consolaModel = {
    getConsolas: (callback) => {
        const query = `
            SELECT 
                c.id,
                c.nombre AS consola,
                m.nombre AS marca,
                cat.nombre AS categoria,
                c.precio,
                c.stock
            FROM consolas c
            LEFT JOIN marcas m ON c.id_marca = m.id
            LEFT JOIN categorias cat ON c.id_categoria = cat.id;
        `;
        db.query(query, callback);
    },

    getConsolaById: (id, callback) => {
        const query = 'SELECT * FROM consolas WHERE id = ?';
        db.query(query, [id], callback);
    },

    postConsola: (datos, callback) => {
        const query = 'INSERT INTO consolas SET ?';
        db.query(query, [datos], callback);
    },

    putConsola: (id, datos, callback) => {
        const query = 'UPDATE consolas SET ? WHERE id = ?';
        db.query(query, [datos, id], callback);
    },

    deleteConsola: (id, callback) => {
        const query = 'DELETE FROM consolas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = consolaModel;
