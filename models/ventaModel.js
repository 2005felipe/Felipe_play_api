const db = require('../config/db');

const ventaModel = {
    getVentas: (callback) => {
        const query = `
            SELECT 
                v.id,
                v.id_cliente,
                CONCAT(cl.nombre, ' ', cl.apellido) AS cliente,
                v.id_consola,
                co.nombre AS consola,
                v.fecha_venta,
                v.cantidad,
                v.total
            FROM ventas v
            JOIN clientes cl ON v.id_cliente = cl.id
            JOIN consolas co ON v.id_consola = co.id;
        `;
        db.query(query, callback);
    },

    getVentaById: (id, callback) => {
        const query = 'SELECT * FROM ventas WHERE id = ?';
        db.query(query, [id], callback);
    },

    postVenta: (datos, callback) => {
        const query = 'INSERT INTO ventas SET ?';
        db.query(query, [datos], callback);
    },

    putVenta: (id, datos, callback) => {
        const query = 'UPDATE ventas SET ? WHERE id = ?';
        db.query(query, [datos, id], callback);
    },

    deleteVenta: (id, callback) => {
        const query = 'DELETE FROM ventas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = ventaModel;
