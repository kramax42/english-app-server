// https://github.com/typestack/class-validator/issues/630
// https://github.com/quantumsheep/class-validator-mongo-object-id/blob/master/src/index.ts

import { WordStudyStatus } from "@/interfaces/user-word.interface";
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsStudyStatus(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsStudyStatus",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return Object.values(WordStudyStatus).includes(value)
                }
            }
        });
    };
} 