"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = exports.queryValidator = exports.paramValidator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function paramValidator(dtoClass, options = {}) {
    return createValidatorMiddleware({
        objectGetter: req => req.params,
        objectSetter: (req, dto) => req.validatedParams = dto,
        dtoClass,
        options,
    });
}
exports.paramValidator = paramValidator;
function queryValidator(dtoClass, options = {}) {
    return createValidatorMiddleware({
        objectGetter: req => req.query,
        objectSetter: (req, dto) => req.validatedQuery = dto,
        dtoClass,
        options,
    });
}
exports.queryValidator = queryValidator;
function bodyValidator(dtoClass, options = {}) {
    return createValidatorMiddleware({
        objectGetter: req => req.body,
        objectSetter: (req, dto) => req.validatedBody = dto,
        dtoClass,
        options,
    });
}
exports.bodyValidator = bodyValidator;
function createValidatorMiddleware({ objectGetter, objectSetter, options, dtoClass }) {
    return function (req, res, next) {
        var _a, _b;
        const params = (_a = objectGetter(req)) !== null && _a !== void 0 ? _a : {};
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, params, { exposeUnsetFields: false, enableImplicitConversion: options.implicitConversion });
        (0, class_validator_1.validateOrReject)(dto, { whitelist: (_b = options.whitelist) !== null && _b !== void 0 ? _b : true })
            .then(() => {
            objectSetter(req, dto);
            next();
        })
            .catch(errors => {
            if (options.passOnError) {
                next();
            }
            else {
                res.status(400).json({ error: true, statusCode: 400, errorCode: 'PARAMS_VALIDATION_ERROR', errors });
            }
        });
    };
}
//# sourceMappingURL=validation.middleware.js.map