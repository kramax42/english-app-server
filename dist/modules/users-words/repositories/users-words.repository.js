"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWordsRepository = void 0;
const user_word_model_1 = require("../../../models/user-word.model");
class UsersWordsRepository {
    constructor() {
        this.wordModel = user_word_model_1.UserWordModel;
    }
    async findAll(userId, skip = 0, limit) {
        const findQuery = this.wordModel
            .find({ user: userId })
            .sort({ _id: 1 })
            .skip(skip);
        if (limit) {
            findQuery.limit(limit);
        }
        // const explain = await findQuery.explain();
        // console.log(explain)
        const words = await findQuery;
        return words;
    }
    async count(userId) {
        // return (await this.wordModel.find({ user: userId }).exec()).length;
        return this.wordModel.countDocuments({ user: userId });
    }
    async create(userId, createUserWordDto) {
        const createdWord = await this.wordModel.create(Object.assign({ user: userId }, createUserWordDto));
        return createdWord;
    }
    async find(userId, word) {
        return this.wordModel.findOne({ word, user: userId }).exec();
    }
    async findById(userId, wordId) {
        const foundWord = await this.wordModel
            .findOne({ user: userId, _id: wordId })
            .exec();
        return foundWord;
    }
    async update(userId, wordId, updateUserWordDto) {
        const updatedWord = await this.wordModel
            .findOneAndUpdate({ _id: wordId, user: userId }, updateUserWordDto, { new: true })
            .exec();
        return updatedWord;
    }
    async delete(userId, wordId) {
        const deletedWord = await this.wordModel
            .findOneAndDelete({ _id: wordId, user: userId })
            .exec();
        return deletedWord;
    }
}
exports.UsersWordsRepository = UsersWordsRepository;
//# sourceMappingURL=users-words.repository.js.map