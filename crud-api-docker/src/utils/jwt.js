const jwt = require("jsonwebtoken");
const ms = require("ms");
const crypto = require("crypto");
const UnauthorizedError = require("../errors/UnauthorizedError");
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}
function calculateRefreshExpiry() {
    return new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN));
}
function hashRefreshToken(refreshToken) {
    return crypto.createHash("sha256").update(refreshToken).digest("hex");
}
function verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
}
module.exports = { generateAccessToken, generateRefreshToken, calculateRefreshExpiry, hashRefreshToken, verifyRefreshToken };