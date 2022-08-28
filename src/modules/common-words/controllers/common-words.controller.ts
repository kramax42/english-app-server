import { NextFunction, Request, Response, Router } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@/dtos/common-word.dto';
import { CommonWord, CommonWordResponseDto, CommonWordWithUserWordResponseDto } from '@/interfaces/common-word.interface';
import { PaginationParamsDto } from '@/dtos/pagination-params.dto';
import {
	bodyValidator,
	queryValidator,
} from '@/middlewares/validation.middleware';
import { permitTo } from '@middlewares/roles.middleware';
import { RequestWithUser, Role } from '@interfaces/auth.interface';
import { ICommonWordsService } from '../services/common-words.service.interface';
import { IController } from '@/interfaces/contoller.interface';
export class CommonWordsController implements IController {
	public path = '/words';
	public router = Router();

	constructor(private readonly commonWordsService: ICommonWordsService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(
			`${this.path}`,
			authMiddleware(false),
			queryValidator(PaginationParamsDto),
			this.findAll
		);
		this.router.get(`${this.path}/count`, this.count);
		this.router.post(
			`${this.path}`,
			// authMiddleware(),
			bodyValidator(CreateCommonWordDto),
			this.create
		);
		this.router.get(`${this.path}/:id`, authMiddleware(), this.getById);
		this.router.patch(
			`${this.path}/:id`,
			authMiddleware(),
			permitTo(Role.ADMIN),
			bodyValidator(UpdateCommonWordDto),
			this.update
		);
		this.router.delete(
			`${this.path}/:id`,
			authMiddleware(),
			permitTo(Role.ADMIN),
			this.delete
		);
	}

	create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordDto = req.validatedBody as CreateCommonWordDto;
			const createdWord: CommonWord = await this.commonWordsService.create(
				wordDto
			);

			const createdWordResponse = this.commonWordsService.transformCommonWordForResponseDto(createdWord);
			res.status(201).json(createdWordResponse);
		} catch (error) {
			next(error);
		}
	};

	findAll = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const query = req.validatedQuery as PaginationParamsDto;

			const words: CommonWordWithUserWordResponseDto[] = await this.commonWordsService.findAll(
				query.skip || 0,
				query.limit || null,
				req?.user?._id,
			);

			res.status(200).json(words);
		} catch (error) {
			next(error);
		}
	};

	count = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordsCount: number = await this.commonWordsService.count();

			res.status(200).json(wordsCount);
		} catch (error) {
			next(error);
		}
	};

	getById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const foundWord: CommonWord = await this.commonWordsService.findById(id);

			const foundWordResponseDto: CommonWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(foundWord);
			res.status(200).json(foundWordResponseDto);
		} catch (error) {
			next(error);
		}
	};

	update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const wordDto = req.validatedBody as UpdateCommonWordDto;

			const updatedWord: CommonWord = await this.commonWordsService.update(
				id,
				wordDto
			);

			const updatedWordResponseDto: CommonWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(updatedWord);
			res.status(200).json(updatedWordResponseDto);
		} catch (error) {
			next(error);
		}
	};

	delete = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const deletedWord: CommonWord = await this.commonWordsService.delete(id);
			console.log('asdasd', deletedWord);
			const deletedWordResponseDto: CommonWordResponseDto = this.commonWordsService.transformCommonWordForResponseDto(deletedWord);
			res.status(200).json(deletedWordResponseDto);
		} catch (error) {
			next(error);
		}
	};
}

