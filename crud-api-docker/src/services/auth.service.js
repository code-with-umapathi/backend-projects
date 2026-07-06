const userRepositories = require("../repositories/user.repositories");
const bcrypt = require("bcrypt");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { generateAccessToken } = require("../utils/jwt");
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
        const accessToken = generateAccessToken(payload);
        return { accessToken };
    }
}
module.exports = new AuthService();