const jwt = require("jsonwebtoken");
const ms = require("ms");
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
}
function calculateRefreshExpiry(){
     return new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN));
}
module.exports = { generateAccessToken, generateRefreshToken, calculateRefreshExpiry };