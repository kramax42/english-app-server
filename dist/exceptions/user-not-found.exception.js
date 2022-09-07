"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class UserNotFoundException extends http_exception_1.HttpException {
    constructor() {
        // 400 - Bad Request
        super(400, 'This user does not exist');
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=user-not-found.exception.js.map