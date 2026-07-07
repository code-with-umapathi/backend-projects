const authServices = require("../services/auth.service");
const { calculateRefreshExpiry } = require("../utils/jwt");
const { refreshCookieOptions } = require("../utils/cookie");
class AuthController {
    async register(req, res) {
        const user = await authServices.register(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }
    async login(req, res) {
        const { accessToken, refreshToken } = await authServices.login(req.body);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: { accessToken }
        });
    }
    async refresh(req, res) {
        const token = req.cookies.refreshToken;
        const { accessToken, refreshToken } = await authServices.refresh(token);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);
        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: { accessToken }
        })
    }
    async logout(req, res) {
        const token = req.cookies.refreshToken;
        await authServices.logout(token);
        res.clearCookie("refreshToken", refreshCookieOptions);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    async logoutAllDevices(req, res) {
        await authServices.logoutAllDevices(req.user.id);
        res.clearCookie("refreshToken", refreshCookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged out from all devices successfully"
        });
    }
}
module.exports = new AuthController();