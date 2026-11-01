const db = require('../config/db');

const clienteModel = {
    getClientes: (callback) => {
        const query = `
            SELECT id, nombre, apellido, cedula, correo, celular
            FROM clientes;
        `;
        db.query(query, callback);
    },

    getClienteById: (id, callback) => {
        const query = 'SELECT * FROM clientes WHERE id = ?';
        db.query(query, [id], callback);
    },

    postCliente: (datos, callback) => {
        const query = 'INSERT INTO clientes SET ?';
        db.query(query, [datos], callback);
    },

    putCliente: (id, datos, callback) => {
        const query = 'UPDATE clientes SET ? WHERE id = ?';
        db.query(query, [datos, id], callback);
    },

    deleteCliente: (id, callback) => {
        const query = 'DELETE FROM clientes WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = clienteModel;
