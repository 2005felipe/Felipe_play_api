const marcaModel = require('../models/marcaModel');
const { manejarErrorDB, idValido, validar } = require('../config/helpers');

// Reglas de validación según las columnas de la tabla marcas
const reglas = {
    nombre: { tipo: 'texto', max: 50, requerido: true },
    pais_origen: { tipo: 'texto', max: 50, requerido: false }
};

const marcaController = {
    getMarcas: (req, res) => {
        marcaModel.getMarcas((err, result) => {
            if (err) return manejarErrorDB(res, err);
            res.status(200).json({ data: result });
        });
    },

    getMarcaById: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        marcaModel.getMarcaById(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Marca no encontrada' });
            }
            res.status(200).json({ data: result[0] });
        });
    },

    postMarca: (req, res) => {
        const { errores, datos } = validar(req.body, reglas, true);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }

        marcaModel.postMarca(datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            marcaModel.getMarcaById(result.insertId, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(201).json({ message: 'Marca creada correctamente', data: rows[0] });
            });
        });
    },

    putMarca: (req, res) => {
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

        marcaModel.putMarca(id, datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Marca no encontrada' });
            }
            marcaModel.getMarcaById(id, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(200).json({ message: 'Marca actualizada correctamente', data: rows[0] });
            });
        });
    },

    deleteMarca: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        marcaModel.deleteMarca(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Marca no encontrada' });
            }
            res.status(200).json({ message: 'Marca eliminada correctamente' });
        });
    }
};

module.exports = marcaController;
