"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("config"));
const http_exception_1 = require("../exceptions/http.exception");
const user_model_1 = require("../models/user.model");
const authMiddleware = (throwError = true) => async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'].split('Bearer ')[1] || req.header('Authorization').split('Bearer ')[1] || null;
        if (Authorization) {
            const secretKey = config_1.default.get('secretKey');
            const verificationResponse = (await jsonwebtoken_1.default.verify(Authorization, secretKey));
            const userId = verificationResponse.id;
            const foundedUser = await user_model_1.UserModel.findById(userId);
            if (foundedUser) {
                req.user = foundedUser;
                next();
            }
            else {
                if (throwError) {
                    next(new http_exception_1.HttpException(401, 'Wrong authentication token'));
                }
                else {
                    next();
                }
            }
        }
        else {
            if (throwError) {
                next(new http_exception_1.HttpException(404, 'Authentication token missing'));
            }
            else {
                next();
            }
        }
    }
    catch (error) {
        if (throwError) {
            next(new http_exception_1.HttpException(401, 'Wrong authentication token'));
        }
        else {
            next();
        }
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map