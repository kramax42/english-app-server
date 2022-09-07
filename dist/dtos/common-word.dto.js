"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommonWordDto = exports.CreateCommonWordDto = void 0;
const tslib_1 = require("tslib");
const common_word_interface_1 = require("../interfaces/common-word.interface");
const word_levell_validator_copy_1 = require("../utils/validators/word-levell.validator copy");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TranscriptionDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TranscriptionDto.prototype, "uk", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], TranscriptionDto.prototype, "us", void 0);
class MeaningDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MeaningDto.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MeaningDto.prototype, "definition", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], MeaningDto.prototype, "translations", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], MeaningDto.prototype, "usageExamples", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], MeaningDto.prototype, "synonyms", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], MeaningDto.prototype, "antonyms", void 0);
tslib_1.__decorate([
    (0, word_levell_validator_copy_1.IsWordLevel)({
        message: "Incorrect word level."
    }),
    tslib_1.__metadata("design:type", String)
], MeaningDto.prototype, "level", void 0);
class CreateCommonWordDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCommonWordDto.prototype, "word", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, class_transformer_1.plainToClass)(TranscriptionDto, value)),
    tslib_1.__metadata("design:type", TranscriptionDto)
], CreateCommonWordDto.prototype, "transcription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true })
    // Additional validating for correct nested DTO field.
    ,
    (0, class_transformer_1.Transform)(({ value: values }) => values.map(value => (0, class_transformer_1.plainToClass)(MeaningDto, value))),
    tslib_1.__metadata("design:type", Array)
], CreateCommonWordDto.prototype, "meanings", void 0);
exports.CreateCommonWordDto = CreateCommonWordDto;
class UpdateCommonWordDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UpdateCommonWordDto.prototype, "word", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, class_transformer_1.plainToClass)(TranscriptionDto, value)),
    tslib_1.__metadata("design:type", TranscriptionDto)
], UpdateCommonWordDto.prototype, "transcription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true })
    // Additional validating for correct nested DTO field.
    ,
    (0, class_transformer_1.Transform)(({ value: values }) => values.map(value => (0, class_transformer_1.plainToClass)(MeaningDto, value))),
    tslib_1.__metadata("design:type", Array)
], UpdateCommonWordDto.prototype, "meanings", void 0);
exports.UpdateCommonWordDto = UpdateCommonWordDto;
//# sourceMappingURL=common-word.dto.js.map