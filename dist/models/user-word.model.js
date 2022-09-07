"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWordModel = exports.userWordSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const user_word_interface_1 = require("../interfaces/user-word.interface");
const common_word_model_1 = require("./common-word.model");
const options_1 = require("./common/options");
exports.userWordSchema = new mongoose_1.default.Schema({
    user: {
        ref: 'User',
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    word: { type: String, required: true },
    transcription: { type: common_word_model_1.transcriptionSchema, default: { uk: null, us: null } },
    meanings: { type: [common_word_model_1.meaningSchema] },
    studyStatus: {
        type: String,
        enum: Object.values(user_word_interface_1.WordStudyStatus),
        default: user_word_interface_1.WordStudyStatus.Learn,
    },
}, options_1.options);
exports.userWordSchema.index({ word: 1 });
exports.userWordSchema.index({ user: 1 });
exports.userWordSchema.index({ word: 1, user: 1 }, { unique: true });
exports.UserWordModel = mongoose_1.default.model('UserWord', exports.userWordSchema);
//# sourceMappingURL=user-word.model.js.map