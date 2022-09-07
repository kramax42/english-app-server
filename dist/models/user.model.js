"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const auth_interface_1 = require("../interfaces/auth.interface");
const options_1 = require("./common/options");
const userSchema = new mongoose_1.default.Schema({
    email: String,
    name: String,
    password: String,
    role: { type: String, enum: Object.values(auth_interface_1.Role), default: auth_interface_1.Role.USER },
}, options_1.options);
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map