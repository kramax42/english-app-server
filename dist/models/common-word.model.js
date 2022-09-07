"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonWordModel = exports.commonWordSchema = exports.meaningSchema = exports.transcriptionSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const common_word_interface_1 = require("../interfaces/common-word.interface");
const options_1 = require("./common/options");
exports.transcriptionSchema = new mongoose_1.default.Schema({
    uk: { type: String, default: null },
    us: { type: String, default: null },
}, options_1.options);
exports.meaningSchema = new mongoose_1.default.Schema({
    definition: { type: String, required: true, default: null },
    translations: { type: [String], required: true, default: [] },
    usageExamples: { type: [String], default: [] },
    synonyms: { type: [String], default: [] },
    antonyms: { type: [String], default: [] },
    pos: {
        type: String,
        enum: Object.values(common_word_interface_1.PartOfSpeech),
        default: null,
    },
    level: {
        type: String,
        enum: Object.values(common_word_interface_1.WordLevel),
        default: common_word_interface_1.WordLevel.Uncategorized,
    },
}, options_1.options);
exports.commonWordSchema = new mongoose_1.default.Schema({
    word: { type: String, required: true },
    transcription: { type: exports.transcriptionSchema, default: { uk: null, us: null } },
    meanings: { type: [exports.meaningSchema] },
}, options_1.options);
exports.commonWordSchema.index({ word: 1 }, { unique: true });
exports.CommonWordModel = mongoose_1.default.model('CommonWord', exports.commonWordSchema);
//# sourceMappingURL=common-word.model.js.map