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
}
module.exports = new AuthController();