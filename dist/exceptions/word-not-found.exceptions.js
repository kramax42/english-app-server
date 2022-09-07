"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordNotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class WordNotFoundException extends http_exception_1.HttpException {
    constructor() {
        // 400 - Bad Request
        super(400, 'This word does not exist');
    }
}
exports.WordNotFoundException = WordNotFoundException;
//# sourceMappingURL=word-not-found.exceptions.js.map