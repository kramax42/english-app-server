"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonWordsController = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const common_word_dto_1 = require("../../../dtos/common-word.dto");
const pagination_params_dto_1 = require("../../../dtos/pagination-params.dto");
const validation_middleware_1 = require("../../../middlewares/validation.middleware");
const roles_middleware_1 = require("../../../middlewares/roles.middleware");
const auth_interface_1 = require("../../../interfaces/auth.interface");
class CommonWordsController {
    constructor(commonWordsService) {
        this.commonWordsService = commonWordsService;
        this.path = '/words';
        this.router = (0, express_1.Router)();
        this.create = async (req, res, next) => {
            try {
                const wordDto = req.validatedBody;
                const createdWord = await this.commonWordsService.create(wordDto);
                const createdWordResponse = this.commonWordsService.transformCommonWordForResponseDto(createdWord);
                res.status(201).json(createdWordResponse);
            }
            catch (error) {
                next(error);
            }
        };
        this.findAll = async (req, res, next) => {
            var _a;
            try {
                const query = req.validatedQuery;
                const words = await this.commonWordsService.findAll(query.skip || 0, query.limit || null, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
                res.status(200).json(words);
            }
            catch (error) {
                next(error);
            }
        };
        this.count = async (req, res, next) => {
            try {
                const wordsCount = await this.commonWordsService.count();
                res.status(200).json(wordsCount);
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const id = req.params.id;
                const foundWord = await this.commonWordsService.findById(id);
                const foundWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(foundWord);
                res.status(200).json(foundWordResponseDto);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const id = req.params.id;
                const wordDto = req.validatedBody;
                const updatedWord = await this.commonWordsService.update(id, wordDto);
                const updatedWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(updatedWord);
                res.status(200).json(updatedWordResponseDto);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = req.params.id;
                const deletedWord = await this.commonWordsService.delete(id);
                const deletedWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(deletedWord);
                res.status(200).json(deletedWordResponseDto);
            }
            catch (error) {
                next(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.authMiddleware)(false), (0, validation_middleware_1.queryValidator)(pagination_params_dto_1.PaginationParamsDto), this.findAll);
        this.router.get(`${this.path}/count`, this.count);
        this.router.post(`${this.path}`, 
        // authMiddleware(),
        (0, validation_middleware_1.bodyValidator)(common_word_dto_1.CreateCommonWordDto), this.create);
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), this.getById);
        this.router.patch(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), (0, roles_middleware_1.permitTo)(auth_interface_1.Role.ADMIN), (0, validation_middleware_1.bodyValidator)(common_word_dto_1.UpdateCommonWordDto), this.update);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.authMiddleware)(), (0, roles_middleware_1.permitTo)(auth_interface_1.Role.ADMIN), this.delete);
    }
}
exports.CommonWordsController = CommonWordsController;
//# sourceMappingURL=common-words.controller.js.map