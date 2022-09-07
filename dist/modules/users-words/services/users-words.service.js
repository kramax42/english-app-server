"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWordsService = void 0;
const word_not_found_exceptions_1 = require("../../../exceptions/word-not-found.exceptions");
const already_exist_exception_1 = require("../../../exceptions/already-exist.exception");
class UsersWordsService {
    constructor(usersWordsRepository) {
        this.usersWordsRepository = usersWordsRepository;
    }
    async create(userId, createUserWordDto) {
        const existedWord = await this.find(userId, createUserWordDto.word);
        if (existedWord) {
            throw new already_exist_exception_1.AlreadyExistsException();
        }
        const createdWord = await this.usersWordsRepository.create(userId, createUserWordDto);
        return createdWord;
    }
    async findAll(userId, skip = 0, limit) {
        const words = await this.usersWordsRepository.findAll(userId, skip, limit);
        return words;
    }
    async count(userId) {
        const wordsCount = await this.usersWordsRepository.count(userId);
        return wordsCount;
    }
    async findById(userId, wordId) {
        const foundWord = await this.usersWordsRepository.findById(userId, wordId);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        return foundWord;
    }
    async update(userId, wordId, updateUserWordDto) {
        const foundWord = await this.usersWordsRepository.findById(userId, wordId);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        // Forbidden updating word
        // with name that already belongs to another word. 
        if (foundWord.word !== updateUserWordDto.word) {
            const existedWord = await this.find(userId, updateUserWordDto.word);
            if (existedWord) {
                throw new already_exist_exception_1.AlreadyExistsException();
            }
        }
        const updatedWord = await this.usersWordsRepository.update(userId, wordId, updateUserWordDto);
        return updatedWord;
    }
    async delete(userId, wordId) {
        const foundWord = await this.usersWordsRepository.findById(userId, wordId);
        if (!foundWord)
            throw new word_not_found_exceptions_1.WordNotFoundException();
        const deletedWord = await this.usersWordsRepository.delete(userId, wordId);
        return deletedWord;
    }
    async find(userId, word) {
        return this.usersWordsRepository.find(userId, word);
    }
    transformUserWordForResponseDTO(word) {
        return {
            id: word._id,
            studyStatus: word.studyStatus,
            userId: word.user.toString(),
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
exports.UsersWordsService = UsersWordsService;
//# sourceMappingURL=users-words.service.js.map