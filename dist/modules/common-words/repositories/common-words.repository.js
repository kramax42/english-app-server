"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonWordsRepository = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const common_word_model_1 = require("../../../models/common-word.model");
class CommonWordsRepository {
    constructor() {
        this.wordModel = common_word_model_1.CommonWordModel;
    }
    async findAll(skip, limit, userId) {
        const aggregate = this.wordModel.aggregate([
            { $sort: { _id: 1 } },
            { $skip: skip },
            { $limit: limit || 5 },
            {
                //https://stackoverflow.com/questions/51010754/add-only-a-field-from-another-collection-in-mongodb
                $lookup: {
                    from: "userwords",
                    let: { thisSessionUserId: new mongoose_1.default.Types.ObjectId(userId), commonWord: '$word' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$word", "$$commonWord"] },
                                        { $eq: ["$user", "$$thisSessionUserId"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "userWord"
                }
            },
            {
                $addFields: {
                    id: "$_id",
                }
            },
            {
                $unwind: {
                    path: "$userWord",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 0,
                    __v: 0,
                    "userWord._id": 0,
                    "userWord.__v": 0,
                    "userWord.user": 0,
                }
            }
        ]);
        // for (const word of words) {
        // 	const userWord = await this.userWordModel.findOne({ commonWord: word._id });
        // 	results.push({
        // 		commonWord: word,
        // 		userStudyStatus: userWord ? userWord.studyStatus : WordStudyStatus.UNKNOWN
        // 	});
        // }
        // return Promise.all(results);
        const results = await aggregate.exec();
        return results;
    }
    async create(createCommonWordDto) {
        const createdWord = await this.wordModel.create(createCommonWordDto);
        return createdWord;
    }
    async find(word) {
        return this.wordModel.findOne({ word }).exec();
    }
    async count() {
        // return this.wordModel.countDocuments({}).exec();
        return this.wordModel.estimatedDocumentCount().exec();
    }
    async findById(id) {
        const foundWord = await this.wordModel.findById(id).exec();
        return foundWord;
    }
    async update(id, dto) {
        const updatedWord = await this.wordModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        return updatedWord;
    }
    async delete(id) {
        const deletedWord = await this.wordModel.findByIdAndDelete(id).exec();
        return deletedWord;
    }
}
exports.CommonWordsRepository = CommonWordsRepository;
//# sourceMappingURL=common-words.repository.js.map