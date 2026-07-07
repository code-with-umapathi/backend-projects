const userRepositories = require("../repositories/user.repositories");
const refreshTokenRepository = require("../repositories/refreshToken.repositories");
const bcrypt = require("bcrypt");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { generateAccessToken, generateRefreshToken, calculateRefreshExpiry, hashRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
class AuthService {
    async register(data) {
        const { name, email, password } = data;
        const existUser = await userRepositories.getByEmail(email);
        if (existUser) {
            throw new ConflictError("User already exists");
        }
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const userId = await userRepositories.create(name, email, hashedPassword);
        if (!userId) {
            throw new ValidtionError("User not registered successfully");
        }
        const user = await userRepositories.getById(userId);
        return user;
    }
    async login(data) {
        const { email, password } = data;
        const user = await userRepositories.getByEmail(email);
        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedError("Invalid email or password");
        }
        const payload = { sub: user.id };
        const refreshPayload = { sub: user.id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(refreshPayload);
        await refreshTokenRepository.create(user.id, hashRefreshToken(refreshToken), calculateRefreshExpiry());
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedError("Refresh token is missing");
        }
        const hashedRefreshToken = hashRefreshToken(refreshToken);
        let payload;
        try {
            payload = verifyRefreshToken(refreshToken);
        } catch (err) {
            throw new UnauthorizedError("Invalid or expire token");
        }
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const storedToken = await refreshTokenRepository.findByHash(hashedRefreshToken, connection);
            if (!storedToken) {
                throw new UnauthorizedError("Invalid or expire token");
            }
            const user = await userRepositories.getById(payload.sub, connection);
            if (!user) {
                throw new UnauthorizedError("User not found");
            }
            await refreshTokenRepository.deleteById(storedToken.id, connection);
            const accessToken = generateAccessToken({ sub: user.id });
            const newRefreshToken = generateRefreshToken({ sub: user.id });
            const hashedNewRefreshToken = hashRefreshToken(newRefreshToken);
            const expiresAt = calculateRefreshExpiry();
            await refreshTokenRepository.create(user.id, hashedNewRefreshToken, expiresAt, connection);
            await connection.commit();
            return { accessToken, refreshToken: newRefreshToken };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
    async logout(refreshToken) {
        if (!refreshToken) {
            return;
        }
        const hashedRefreshToken = hashRefreshToken(refreshToken);
        await refreshTokenRepository.deleteByToken(hashedRefreshToken);
    }
    async logoutAllDevices(userId){
        await refreshTokenRepository.deleteByUserId(userId);
    }
}
module.exports = new AuthService();