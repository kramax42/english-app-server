"use strict";
// https://github.com/typestack/class-validator/issues/630
// https://github.com/quantumsheep/class-validator-mongo-object-id/blob/master/src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsWordLevel = void 0;
const common_word_interface_1 = require("../../interfaces/common-word.interface");
const class_validator_1 = require("class-validator");
function IsWordLevel(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsWordLevel",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return Object.values(common_word_interface_1.WordLevel).includes(value);
                }
            }
        });
    };
}
exports.IsWordLevel = IsWordLevel;
//# sourceMappingURL=word-levell.validator%20copy.js.map