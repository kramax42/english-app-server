"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const user_model_1 = require("../../../models/user.model");
class UsersRepository {
    constructor() {
        this.userModel = user_model_1.UserModel;
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        return users;
    }
    async create({ email, name, password, }) {
        const user = await this.userModel.create({
            email,
            name,
            password,
        });
        return user;
    }
    async findById(userId) {
        const foundUser = await this.userModel.findById(userId).exec();
        return foundUser;
    }
    async findByEmail(email) {
        const foundUser = await this.userModel.findOne({ email }).exec();
        return foundUser;
    }
    async update(userId, userData) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, userData, { new: true })
            .exec();
        return updatedUser;
    }
    async delete(userId) {
        const deletedWord = await this.userModel.findByIdAndDelete(userId).exec();
        return deletedWord;
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map