"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParamsDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationParamsDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], PaginationParamsDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(1),
    tslib_1.__metadata("design:type", Number)
], PaginationParamsDto.prototype, "limit", void 0);
exports.PaginationParamsDto = PaginationParamsDto;
//# sourceMappingURL=pagination-params.dto.js.map