"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWordsController = void 0;
const express_1 = require("express");
const user_word_dto_1 = require("../../../dtos/user-word.dto");
const validation_middleware_1 = require("../../../middlewares/validation.middleware");
const pagination_params_dto_1 = require("../../../dtos/pagination-params.dto");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
class UsersWordsController {
    constructor(usersWordsService) {
        this.usersWordsService = usersWordsService;
        this.path = '/user-words';
        this.router = (0, express_1.Router)();
        this.create = async (req, res, next) => {
            try {
                const wordDto = req.validatedBody;
                const createdWord = await this.usersWordsService.create(req.user._id, wordDto);
                const createdWordResponseDTO = this.usersWordsService.transformUserWordForResponseDTO(createdWord);
                res.status(201).json(createdWordResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.findAll = async (req, res, next) => {
            const query = req.validatedQuery;
            try {
                const words = await this.usersWordsService.findAll(req.user._id, query.skip, query.limit);
                const wordsResponseDTO = words.map(word => {
                    return this.usersWordsService.transformUserWordForResponseDTO(word);
                });
                res.status(200).json(wordsResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.count = async (req, res, next) => {
            try {
                const wordsCount = await this.usersWordsService.count(req.user._id);
                res.status(200).json(wordsCount);
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const wordId = req.params.id;
                const foundWord = await this.usersWordsService.findById(req.user._id, wordId);
                const foundWordResponseDTO = this.usersWordsService.transformUserWordForResponseDTO(foundWord);
                res.status(200).json(foundWordResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const wordId = req.params.id;
                const wordDto = req.validatedBody;
                const updatedWord = await this.usersWordsService.update(req.user._id, wordId, wordDto);
                const updatedWordResponseDTO = this.usersWordsService.transformUserWordForResponseDTO(updatedWord);
                res.status(200).json(updatedWordResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const wordId = req.params.id;
                const deletedWord = await this.usersWordsService.delete(req.user._id, wordId);
                const deletedWordResponseDTO = this.usersWordsService.transformUserWordForResponseDTO(deletedWord);
                res.status(200).json(deletedWordResponseDTO);
            }
            catch (error) {
                next(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.authMiddleware)(), (0, validation_middleware_1.queryValidator)(pagination_params_dto_1.PaginationParamsDto), this.findAll);
        this.router.get(`${this.path}/count`, (0, auth_middleware_1.authMiddleware)(), this.count);
        this.router.post(`${this.path}`, (0, auth_middleware_1.authMiddleware)(), (0, validation_middleware_1.bodyValidator)(user_word_dto_1.UpdateUserWordDto), this.create);
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), this.getById);
        this.router.patch(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), (0, validation_middleware_1.bodyValidator)(user_word_dto_1.UpdateUserWordDto), this.update);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), this.delete);
    }
}
exports.UsersWordsController = UsersWordsController;
//# sourceMappingURL=users-words.controller.js.map