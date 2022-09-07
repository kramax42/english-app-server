"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongCredentialsException = void 0;
const http_exception_1 = require("./http.exception");
class WrongCredentialsException extends http_exception_1.HttpException {
    constructor() {
        // 401 - Unauthorized
        super(401, 'Wrong credentials provided');
    }
}
exports.WrongCredentialsException = WrongCredentialsException;
//# sourceMappingURL=wrong-credentials.exception.js.map