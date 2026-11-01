const ventaModel = require('../models/ventaModel');
const { manejarErrorDB, idValido, validar } = require('../config/helpers');

// Reglas de validación según las columnas de la tabla ventas
const reglas = {
    id_cliente: { tipo: 'entero', min: 1, requerido: true },
    id_consola: { tipo: 'entero', min: 1, requerido: true },
    fecha_venta: { tipo: 'fecha', requerido: false },
    cantidad: { tipo: 'entero', min: 1, requerido: true },
    total: { tipo: 'decimal', min: 0, requerido: true }
};

const ventaController = {
    getVentas: (req, res) => {
        ventaModel.getVentas((err, result) => {
            if (err) return manejarErrorDB(res, err);
            res.status(200).json({ data: result });
        });
    },

    getVentaById: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        ventaModel.getVentaById(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.status(200).json({ data: result[0] });
        });
    },

    postVenta: (req, res) => {
        const { errores, datos } = validar(req.body, reglas, true);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }

        ventaModel.postVenta(datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            ventaModel.getVentaById(result.insertId, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(201).json({ message: 'Venta creada correctamente', data: rows[0] });
            });
        });
    },

    putVenta: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        const { errores, datos } = validar(req.body, reglas, false);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
        }

        ventaModel.putVenta(id, datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            ventaModel.getVentaById(id, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(200).json({ message: 'Venta actualizada correctamente', data: rows[0] });
            });
        });
    },

    deleteVenta: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        ventaModel.deleteVenta(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.status(200).json({ message: 'Venta eliminada correctamente' });
        });
    }
};

module.exports = ventaController;
