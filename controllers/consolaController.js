const consolaModel = require('../models/consolaModel');
const { manejarErrorDB, idValido, validar } = require('../config/helpers');

// Reglas de validación según las columnas de la tabla consolas
const reglas = {
    nombre: { tipo: 'texto', max: 100, requerido: true },
    id_marca: { tipo: 'entero', min: 1, requerido: false },
    id_categoria: { tipo: 'entero', min: 1, requerido: false },
    precio: { tipo: 'decimal', min: 0.01, requerido: true },
    stock: { tipo: 'entero', min: 0, requerido: false }
};

const consolaController = {
    getConsolas: (req, res) => {
        consolaModel.getConsolas((err, result) => {
            if (err) return manejarErrorDB(res, err);
            res.status(200).json({ data: result });
        });
    },

    getConsolaById: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        consolaModel.getConsolaById(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Consola no encontrada' });
            }
            res.status(200).json({ data: result[0] });
        });
    },

    postConsola: (req, res) => {
        const { errores, datos } = validar(req.body, reglas, true);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }

        consolaModel.postConsola(datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            consolaModel.getConsolaById(result.insertId, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(201).json({ message: 'Consola creada correctamente', data: rows[0] });
            });
        });
    },

    putConsola: (req, res) => {
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

        consolaModel.putConsola(id, datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Consola no encontrada' });
            }
            consolaModel.getConsolaById(id, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(200).json({ message: 'Consola actualizada correctamente', data: rows[0] });
            });
        });
    },

    deleteConsola: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        consolaModel.deleteConsola(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Consola no encontrada' });
            }
            res.status(200).json({ message: 'Consola eliminada correctamente' });
        });
    }
};

module.exports = consolaController;
