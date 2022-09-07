"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const user_dto_1 = require("../../../dtos/user.dto");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const auth_dto_1 = require("../../../dtos/auth.dto");
const validation_middleware_1 = require("../../../middlewares/validation.middleware");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.signUp = async (req, res, next) => {
            try {
                const user = req.validatedBody;
                const createdUser = await this.authService.signUp(user);
                const createdUserResponseDTO = this.authService.transformUserForResponseDTO(createdUser);
                res.status(201).json(createdUserResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.signIn = async (req, res, next) => {
            try {
                const user = req.validatedBody;
                const { cookie, foundUser, accessToken } = await this.authService.signIn(user);
                const foundUserResponseDTO = this.authService.transformUserForResponseDTO(foundUser);
                res.setHeader('Set-Cookie', cookie);
                res.status(200).json({ user: foundUserResponseDTO, accessToken });
            }
            catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next) => {
            try {
                const user = req.user;
                const logOutUser = await this.authService.logOut(user.email);
                const logOutUserResponseDTO = this.authService.transformUserForResponseDTO(logOutUser);
                res.setHeader('Set-Cookie', ['Authorization=; HttpOnly; SameSite=None; Secure; Max-age=0; Path=/;']);
                res.status(200).json(logOutUserResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.me = async (req, res, next) => {
            try {
                const user = req.user;
                const userResponseDTO = this.authService.transformUserForResponseDTO(user);
                res.status(200).json(userResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/sign-up`, (0, validation_middleware_1.bodyValidator)(user_dto_1.CreateUserDto), this.signUp);
        this.router.post(`${this.path}/sign-in`, (0, validation_middleware_1.bodyValidator)(auth_dto_1.LoginDto), this.signIn);
        this.router.delete(`${this.path}/log-out`, (0, auth_middleware_1.authMiddleware)(), this.logOut);
        this.router.get(`${this.path}/me`, (0, auth_middleware_1.authMiddleware)(), this.me);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map