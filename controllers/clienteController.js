const clienteModel = require('../models/clienteModel');
const { manejarErrorDB, idValido, validar } = require('../config/helpers');

// Reglas de validación según las columnas de la tabla clientes
const reglas = {
    nombre: { tipo: 'texto', max: 50, requerido: true },
    apellido: { tipo: 'texto', max: 50, requerido: true },
    cedula: { tipo: 'texto', max: 15, requerido: true },
    correo: { tipo: 'correo', max: 100, requerido: true },
    celular: { tipo: 'texto', max: 15, requerido: false }
};

const clienteController = {
    getClientes: (req, res) => {
        clienteModel.getClientes((err, result) => {
            if (err) return manejarErrorDB(res, err);
            res.status(200).json({ data: result });
        });
    },

    getClienteById: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        clienteModel.getClienteById(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json({ data: result[0] });
        });
    },

    postCliente: (req, res) => {
        const { errores, datos } = validar(req.body, reglas, true);
        if (errores.length > 0) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
        }
        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }

        clienteModel.postCliente(datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            clienteModel.getClienteById(result.insertId, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(201).json({ message: 'Cliente creado correctamente', data: rows[0] });
            });
        });
    },

    putCliente: (req, res) => {
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

        clienteModel.putCliente(id, datos, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            clienteModel.getClienteById(id, (err2, rows) => {
                if (err2) return manejarErrorDB(res, err2);
                res.status(200).json({ message: 'Cliente actualizado correctamente', data: rows[0] });
            });
        });
    },

    deleteCliente: (req, res) => {
        const { id } = req.params;
        if (!idValido(id)) {
            return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
        }

        clienteModel.deleteCliente(id, (err, result) => {
            if (err) return manejarErrorDB(res, err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        });
    }
};

module.exports = clienteController;
