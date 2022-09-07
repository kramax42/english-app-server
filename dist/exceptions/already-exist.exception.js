"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsException = void 0;
const http_exception_1 = require("./http.exception");
class AlreadyExistsException extends http_exception_1.HttpException {
    constructor() {
        // 409 - Conflict
        super(409, `Already exists`);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;
//# sourceMappingURL=already-exist.exception.js.map