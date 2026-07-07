const { pool } = require("../config/db");
class RefreshTokenRepository {
    async create(userId, token, expiresAt) {
        const [result] = await pool.execute(`insert into refresh_tokens(user_id, token, expires_at) values(?,?,?)`, [userId, token, expiresAt]);
        return result.insertId;
    }
    async findByToken(token) {
        const [rows] = await pool.execute(`select id, user_id, token from refresh_tokens where token = ?`, [token]);
        return rows[0] || null;
    }
    async deleteByToken(token) {
        const [result] = await pool.execute(`delete from refresh_tokens where token = ?`, [token]);
        return result.affectedRows;
    }
    async deleteByUserId(userId) {
        const [result] = await pool.execute(`delete from refresh_tokens where user_id = ?`, [userId]);
        return result.affectedRows;
    }
}
module.exports = new RefreshTokenRepository();