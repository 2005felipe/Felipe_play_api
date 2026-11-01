const db = require('../config/db');

const categoriaModel = {
    getCategorias: (callback) => {
        const query = `
            SELECT id, nombre, descripcion
            FROM categorias;
        `;
        db.query(query, callback);
    },

    getCategoriaById: (id, callback) => {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        db.query(query, [id], callback);
    },

    postCategoria: (datos, callback) => {
        const query = 'INSERT INTO categorias SET ?';
        db.query(query, [datos], callback);
    },

    putCategoria: (id, datos, callback) => {
        const query = 'UPDATE categorias SET ? WHERE id = ?';
        db.query(query, [datos, id], callback);
    },

    deleteCategoria: (id, callback) => {
        const query = 'DELETE FROM categorias WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = categoriaModel;
