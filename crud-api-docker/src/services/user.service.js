const userRepositories = require("../repositories/user.repositories");
const ValidtionError = require("../errors/ValidationError");
class UserService {
    async create(data) {
        const { name, email } = data;
        const userId = await userRepositories.create(name, email);
        if (!userId) {
            throw new ValidtionError("User not registered successfully");
        }
        const user = await userRepositories.getById(userId);
        return user;
    }
    async getAll() {
        const users = await userRepositories.getAll();
        if (users.length === 0) {
            throw new ValidtionError("No users found");
        }
        return users;
    }
    async getById(params) {
        const { id } = params;
        const user = await userRepositories.getById(id);
        if (!user) {
            throw new ValidtionError("User not found");
        }
        return user;
    }
    async update(params, data) {
        const { id } = params;
        const user = await userRepositories.getById(id);
        if (!user) {
            throw new ValidtionError("User not exist");
        }
        const { name, email } = data;
        const isUpdated = await userRepositories.update(id, name, email);
        if (isUpdated === 0) {
            throw new ValidtionError("User not updated");
        }
        const updatedUser = userRepositories.getById(id);
        return updatedUser;
    }
    async delete(params) {
        const { id } = params;
        const user = await userRepositories.getById(id);
        if (!user) {
            throw new ValidtionError("User not exist");
        }
        const isDeleted = await userRepositories.delete(id);
        if(isDeleted === 0){
            throw new ValidtionError("User not deleted");
        }
    }
}
module.exports = new UserService();