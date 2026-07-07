const { pool } = require("../config/db");
class RefreshTokenRepository {
    async create(userId, token, expiresAt, connection = pool) {
        const [result] = await connection.execute(`insert into refresh_tokens(user_id, token, expires_at) values(?,?,?)`, [userId, token, expiresAt]);
        return result.insertId;
    }
    async findByHash(token, connection = pool) {
        const [rows] = await connection.execute(`select id, user_id, token from refresh_tokens where token = ?`, [token]);
        return rows[0] || null;
    }
    async deleteByToken(token, connection = pool) {
        const [result] = await connection.execute(`delete from refresh_tokens where token = ?`, [token]);
        return result.affectedRows;
    }
    async deleteByUserId(userId, connection = pool) {
        const [result] = await connection.execute(`delete from refresh_tokens where user_id = ?`, [userId]);
        return result.affectedRows;
    }
    async deleteById(tokenId, connection = pool){
        const [result] = await connection.execute(`delete from refresh_tokens where user_id = ?`, [tokenId]);
        return result.affectedRows;
    }
}
module.exports = new RefreshTokenRepository();