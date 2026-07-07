const authServices = require("../services/auth.service");
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
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: { accessToken }
        });
    }
}
module.exports = new AuthController();