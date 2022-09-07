"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserWordDto = exports.CreateUserWordDto = void 0;
const tslib_1 = require("tslib");
const user_word_interface_1 = require("../interfaces/user-word.interface");
const study_status_validator_1 = require("../utils/validators/study-status.validator");
const class_validator_1 = require("class-validator");
const common_word_dto_1 = require("./common-word.dto");
class CreateUserWordDto extends common_word_dto_1.CreateCommonWordDto {
}
tslib_1.__decorate([
    (0, study_status_validator_1.IsStudyStatus)({
        message: "Incorrect word study status."
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserWordDto.prototype, "studyStatus", void 0);
exports.CreateUserWordDto = CreateUserWordDto;
class UpdateUserWordDto extends common_word_dto_1.UpdateCommonWordDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, study_status_validator_1.IsStudyStatus)({
        message: "Incorrect word study status."
    }),
    tslib_1.__metadata("design:type", String)
], UpdateUserWordDto.prototype, "studyStatus", void 0);
exports.UpdateUserWordDto = UpdateUserWordDto;
//# sourceMappingURL=user-word.dto.js.map