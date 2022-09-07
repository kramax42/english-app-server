"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const user_not_found_exception_1 = require("../../../exceptions/user-not-found.exception");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        const users = await this.usersRepository.findAll();
        return users;
    }
    async findById(userId) {
        const foundUser = await this.usersRepository.findById(userId);
        if (!foundUser)
            throw new user_not_found_exception_1.UserNotFoundException();
        return foundUser;
    }
    async update(userId, userDto) {
        const foundUser = await this.usersRepository.findById(userId);
        if (!foundUser)
            throw new user_not_found_exception_1.UserNotFoundException();
        const { name, email, password } = userDto;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const updatedUser = await this.usersRepository.update(userId, {
            name,
            email,
            password: hashedPassword,
        });
        return updatedUser;
    }
    async delete(userId) {
        const foundUser = await this.usersRepository.findById(userId);
        if (!foundUser)
            throw new user_not_found_exception_1.UserNotFoundException();
        const deletedWord = await this.usersRepository.delete(userId);
        return deletedWord;
    }
    async findUser(email) {
        return this.usersRepository.findByEmail(email);
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map