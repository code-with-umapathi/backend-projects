const userServices = require("../services/user.service");
class UserController {
    async create(req, res) {
        const user = await userServices.create(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }
    async getAll(req, res) {
        const users = await userServices.getAll();
        return res.status(200).json({
            success: true,
            data: users
        })
    }
    async getById(req, res) {
        const user = await userServices.getById(req.params);
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    async update(req, res) {
        const user = await userServices.update(req.params, req.body);
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    }
    async delete(req, res) {
        const user = await userServices.delete(req.params);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
}
module.exports = new UserController();