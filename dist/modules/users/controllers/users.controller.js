"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = require("express");
const user_dto_1 = require("../../../dtos/user.dto");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const validation_middleware_1 = require("../../../middlewares/validation.middleware");
const forbidden_exception_1 = require("../../../exceptions/forbidden.exception");
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.findAll = async (req, res, next) => {
            try {
                const getAllUsersData = await this.usersService.findAll();
                res
                    .status(200)
                    .json({ data: getAllUsersData, message: 'Get all users.' });
            }
            catch (error) {
                next(error);
            }
        };
        this.findById = async (req, res, next) => {
            try {
                const userId = req.params.id;
                const foundUser = await this.usersService.findById(userId);
                res.status(200).json(foundUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const userId = req.params.id;
                if (userId !== req.user._id) {
                    throw new forbidden_exception_1.ForbiddenException();
                }
                const userData = req.body;
                const updatedUser = await this.usersService.update(userId, userData);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const userId = req.params.id;
                const deletedUser = await this.usersService.delete(userId);
                res.status(200).json(deletedUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.authMiddleware)(), this.findAll);
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), this.findById);
        this.router.patch(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), (0, validation_middleware_1.bodyValidator)(user_dto_1.UpdateUserDto), this.update);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), this.delete);
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map