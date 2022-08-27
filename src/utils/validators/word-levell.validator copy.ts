// https://github.com/typestack/class-validator/issues/630
// https://github.com/quantumsheep/class-validator-mongo-object-id/blob/master/src/index.ts

import { WordLevel } from "@/interfaces/common-word.interface";
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsWordLevel(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsWordLevel",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return Object.values(WordLevel).includes(value)
                }
            }
        });
    };
} 