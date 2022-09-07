"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitTo = void 0;
const forbidden_exception_1 = require("../exceptions/forbidden.exception");
const permitTo = (...allowedRoles) => (req, res, next) => {
    const user = req.user;
    console.log(allowedRoles);
    console.log(user.role);
    console.log(allowedRoles.includes(user.role));
    if (!allowedRoles.includes(user.role)) {
        return next(new forbidden_exception_1.ForbiddenException());
    }
    next();
};
exports.permitTo = permitTo;
//# sourceMappingURL=roles.middleware.js.map