const categoriaModel = require('../models/categoriaModel');
const { manejarErrorDB, idValido, validar } = require('../config/helpers');

// Reglas de validación según las columnas de la tabla categorias
const reglas = {
    nombre: { tipo: 'texto', max: 50, requerido: true },
    descripcion: { tipo: 'texto', max: 65535, requerido: false }
};

const categoriaController = {
    getCategorias: (req, res) => {
        categoriaModel.getCategorias((err, result) => {
            if (err) return manejarErrorDB(res, err);
            res.status(200).json({ data: result });
        });
    },

    getCategoriaById: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        categoriaModel.getCategoriaById(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.status(200).json({ data: result[0] });
        });
    },

    postCategoria: (req, res) => {
        const { errores, datos } = validar(req.body, reglas, true);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }

        categoriaModel.postCategoria(datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            categoriaModel.getCategoriaById(result.insertId, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(201).json({ message: 'Categoría creada correctamente', data: rows[0] });
            });
        });
    },

    putCategoria: (req, res) => {
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

        categoriaModel.putCategoria(id, datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            categoriaModel.getCategoriaById(id, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(200).json({ message: 'Categoría actualizada correctamente', data: rows[0] });
            });
        });
    },

    deleteCategoria: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        categoriaModel.deleteCategoria(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.status(200).json({ message: 'Categoría eliminada correctamente' });
        });
    }
};

module.exports = categoriaController;
