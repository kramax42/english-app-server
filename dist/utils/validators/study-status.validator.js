"use strict";
// https://github.com/typestack/class-validator/issues/630
// https://github.com/quantumsheep/class-validator-mongo-object-id/blob/master/src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStudyStatus = void 0;
const user_word_interface_1 = require("../../interfaces/user-word.interface");
const class_validator_1 = require("class-validator");
function IsStudyStatus(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsStudyStatus",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return Object.values(user_word_interface_1.WordStudyStatus).includes(value);
                }
            }
        });
    };
}
exports.IsStudyStatus = IsStudyStatus;
//# sourceMappingURL=study-status.validator.js.map