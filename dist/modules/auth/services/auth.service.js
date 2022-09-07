"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const config_1 = tslib_1.__importDefault(require("config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const wrong_credentials_exception_1 = require("../../../exceptions/wrong-credentials.exception");
const already_exist_exception_1 = require("../../../exceptions/already-exist.exception");
class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signUp({ email, password, name }) {
        const existedUser = await this.usersRepository.findByEmail(email);
        if (existedUser)
            throw new already_exist_exception_1.AlreadyExistsException();
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await this.usersRepository.create({
            email,
            name,
            password: hashedPassword,
        });
        return newUser;
    }
    async signIn({ email, password, }) {
        const foundUser = await this.usersRepository.findByEmail(email);
        if (!foundUser)
            throw new wrong_credentials_exception_1.WrongCredentialsException();
        const isPasswordMatching = await bcrypt_1.default.compare(password, foundUser.password);
        if (!isPasswordMatching) {
            throw new wrong_credentials_exception_1.WrongCredentialsException();
        }
        const tokenData = this.createToken(foundUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, foundUser, accessToken: tokenData.token };
    }
    async logOut(email) {
        const foundUser = await this.usersRepository.findByEmail(email);
        if (!foundUser)
            throw new wrong_credentials_exception_1.WrongCredentialsException();
        return foundUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user._id };
        const secretKey = config_1.default.get('secretKey');
        const expiresIn = 60 * 60 * 100;
        return {
            expiresIn,
            token: jsonwebtoken_1.default.sign(dataStoredInToken, secretKey, { expiresIn }),
        };
    }
    createCookie(tokenData) {
        return `Authorization= Bearer ${tokenData.token}; Path=/; HttpOnly; SameSite=None; Secure; Max-Age=${tokenData.expiresIn};`;
    }
    transformUserForResponseDTO(user) {
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map