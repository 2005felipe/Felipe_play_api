// Funciones de apoyo compartidas por todos los controladores

// Traduce los errores de MySQL a respuestas HTTP claras
const manejarErrorDB = (res, err) => {
    console.error(err);
    switch (err.code) {
        case 'ER_DUP_ENTRY':
            return res.status(409).json({ error: 'Ya existe un registro con ese valor único (duplicado)' });
        case 'ER_NO_REFERENCED_ROW_2':
        case 'ER_NO_REFERENCED_ROW':
            return res.status(409).json({ error: 'Llave foránea inválida: el registro relacionado no existe' });
        case 'ER_ROW_IS_REFERENCED_2':
        case 'ER_ROW_IS_REFERENCED':
            return res.status(409).json({ error: 'No se puede eliminar: otros registros dependen de este' });
        case 'ER_BAD_NULL_ERROR':
            return res.status(400).json({ error: 'Falta un campo obligatorio' });
        case 'ER_DATA_TOO_LONG':
        case 'ER_TRUNCATED_WRONG_VALUE':
        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
        case 'ER_WARN_DATA_OUT_OF_RANGE':
        case 'ER_CHECK_CONSTRAINT_VIOLATED':
            return res.status(400).json({ error: 'Algún dato tiene un formato, tamaño o valor inválido' });
        default:
            return res.status(500).json({ error: 'Error en la base de datos' });
    }
};

// El id de la URL debe ser un entero positivo
const idValido = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

// Valida el body según las reglas de cada tabla.
// esCrear = true  -> exige los campos obligatorios (POST)
// esCrear = false -> solo valida los campos que lleguen (PUT)
const validar = (body, reglas, esCrear) => {
    const errores = [];
    const datos = {};
    body = body || {};

    Object.keys(reglas).forEach((campo) => {
        const r = reglas[campo];
        let valor = body[campo];

        if (valor === undefined) {
            if (esCrear && r.requerido) errores.push(`El campo '${campo}' es obligatorio`);
            return;
        }

        if (typeof valor === 'string') valor = valor.trim();

        if (valor === null || valor === '') {
            if (r.requerido) errores.push(`El campo '${campo}' no puede estar vacío`);
            else datos[campo] = null;
            return;
        }

        switch (r.tipo) {
            case 'entero':
                if (!Number.isInteger(Number(valor)) || Number(valor) < r.min) {
                    errores.push(`El campo '${campo}' debe ser un número entero mayor o igual a ${r.min}`);
                    return;
                }
                valor = Number(valor);
                break;
            case 'decimal':
                if (isNaN(Number(valor)) || Number(valor) < r.min) {
                    errores.push(`El campo '${campo}' debe ser un número mayor o igual a ${r.min}`);
                    return;
                }
                valor = Number(valor);
                break;
            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor)) || String(valor).length > r.max) {
                    errores.push(`El campo '${campo}' debe ser un correo válido`);
                    return;
                }
                valor = String(valor);
                break;
            case 'fecha':
                if (isNaN(Date.parse(valor))) {
                    errores.push(`El campo '${campo}' debe ser una fecha válida (AAAA-MM-DD HH:MM:SS)`);
                    return;
                }
                valor = String(valor);
                break;
            default: // texto
                if (typeof valor === 'object') {
                    errores.push(`El campo '${campo}' debe ser texto`);
                    return;
                }
                valor = String(valor);
                if (valor.length > r.max) {
                    errores.push(`El campo '${campo}' admite máximo ${r.max} caracteres`);
                    return;
                }
        }

        datos[campo] = valor;
    });

    return { errores, datos };
};

module.exports = { manejarErrorDB, idValido, validar };
