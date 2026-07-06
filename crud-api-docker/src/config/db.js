const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

async function testConenction() {
    const connection = await pool.getConnection();
    console.log("MYSQL Connected");
    connection.release();
}

module.exports = { pool, testConenction };