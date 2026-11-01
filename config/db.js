require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectTimeout: 60000,
    connectionLimit: 2,
    maxIdle: 1,
    idleTimeout: 60000,
    waitForConnections: true,
    ssl: {
        rejectUnauthorized: false
    }
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Error al conectar con la base de datos en Clever Cloud:", err.code, err.message);
        return;
    }
    console.log("¡Conexión EXITOSA a MySQL en Clever Cloud!");
    connection.release();
});

module.exports = db;
