"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonWordsService = void 0;
const word_not_found_exceptions_1 = require("../../../exceptions/word-not-found.exceptions");
const already_exist_exception_1 = require("../../../exceptions/already-exist.exception");
class CommonWordsService {
    constructor(commonWordsRepository) {
        this.commonWordsRepository = commonWordsRepository;
    }
    async create(wordDto) {
        const existedWord = await this.find(wordDto.word);
        if (existedWord) {
            throw new already_exist_exception_1.AlreadyExistsException();
        }
        const createdWord = await this.commonWordsRepository.create(wordDto);
        // await newWord.save();
        return createdWord;
    }
    async findAll(skip, limit, userId) {
        const words = await this.commonWordsRepository.findAll(skip, limit, userId);
        return words;
    }
    async count() {
        const wordsCount = await this.commonWordsRepository.count();
        return wordsCount;
    }
    async findById(userId) {
        const foundWord = await this.commonWordsRepository.findById(userId);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        return foundWord;
    }
    async update(id, wordDto) {
        const foundWord = await this.commonWordsRepository.findById(id);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        const updatedWord = await this.commonWordsRepository.update(id, wordDto);
        return updatedWord;
    }
    async delete(id) {
        const foundWord = await this.commonWordsRepository.findById(id);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        const deletedWord = await this.commonWordsRepository.delete(id);
        return deletedWord;
    }
    async find(word) {
        return this.commonWordsRepository.find(word);
    }
    transformCommonWordForResponseDto(word) {
        return {
            id: word._id,
            word: word.word,
            transcription: {
                uk: word.transcription.uk || null,
                us: word.transcription.us || null,
            },
            meanings: word.meanings.map(meaning => {
                return {
                    pos: meaning.pos || null,
                    definition: meaning.definition || null,
                    translations: meaning.translations,
                    synonyms: meaning.synonyms,
                    antonyms: meaning.antonyms,
                    level: meaning.level,
                    usageExamples: meaning.usageExamples,
                };
            }),
        };
    }
}
exports.CommonWordsService = CommonWordsService;
//# sourceMappingURL=common-words.service.js.map