const userRepositories = require("../repositories/user.repositories");
const bcrypt = require("bcrypt");
const ConflictError = require("../errors/ConflictError");
const ValidationError = require("../errors/ValidationError");
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
    
}
module.exports = new AuthService();