const { pool } = require("../config/db");
class UserRepositories {
    async create(name, email, password) {
        const [result] = await pool.execute(`insert into users(name, email, password) values(?,?,?)`, [name, email, password]);
        return result.insertId;
    }
    async update(id, name, email) {
        const [result] = await pool.execute(`update users set name = ?, email = ? where id = ?`, [name, email, id]);
        return result.affectedRows;
    }
    async getAll() {
        const [rows] = await pool.execute(`select id, name, email, created_at from users`);
        return rows;
    }
    async getById(id, connection = pool) {
        const [rows] = await connection.execute(`select id, name, email, created_at from users where id = ?`, [id]);
        return rows[0] || null;
    }
    async getByEmail(email) {
        const [rows] = await pool.execute(`select id, name, email, password, created_at from users where email = ?`, [email]);
        return rows[0] || null;
    }
    async delete(id) {
        const [result] = await pool.execute(`delete from users where id = ?`, [id]);
        return result.affectedRows;
    }
}
module.exports = new UserRepositories();