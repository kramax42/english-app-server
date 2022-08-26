import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserWordDto, UpdateUserWordDto } from '@/dtos/user-word.dto';
import { UserWord, UserWordResponseDto } from '@/interfaces/user-word.interface';
import {
	bodyValidator,
	queryValidator,
} from '@/middlewares/validation.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PaginationParamsDto } from '@/dtos/pagination-params.dto';
import { IUsersWordsService } from '../services/users-words.service.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { IController } from '@/interfaces/contoller.interface';

export class UsersWordsController implements IController {
	public path = '/user-words';
	public router = Router();

	constructor(private readonly usersWordsService: IUsersWordsService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware(), queryValidator(PaginationParamsDto), this.findAll);
		this.router.get(`${this.path}/count`, authMiddleware(), this.count);
		this.router.post(
			`${this.path}`,
			authMiddleware(),
			bodyValidator(UpdateUserWordDto),
			this.create
		);
		this.router.get(`${this.path}/:id`, authMiddleware(), this.getById);
		this.router.patch(
			`${this.path}/:id`,
			authMiddleware(),
			bodyValidator(UpdateUserWordDto),
			this.update
		);
		this.router.delete(`${this.path}/:id`, authMiddleware(), this.delete);
	}

	create = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordDto = req.validatedBody as CreateUserWordDto;
			const createdWord: UserWord = await this.usersWordsService.create(
				req.user._id,
				wordDto
			);
			const createdWordResponseDTO: UserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(createdWord);
			res.status(201).json(createdWordResponseDTO);
		} catch (error) {
			next(error);
		}
	};

	findAll = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {

		const query = req.validatedQuery as PaginationParamsDto;
		try {
			const words: UserWord[] = await this.usersWordsService.findAll(
				req.user._id,
				query.skip,
				query.limit
			);

			const wordsResponseDTO: UserWordResponseDto[] = words.map(word => {
				return this.usersWordsService.transformUserWordForResponseDTO(word);
			})
			res.status(200).json(wordsResponseDTO);
		} catch (error) {
			next(error);
		}
	};

	count = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordsCount: number = await this.usersWordsService.count(req.user._id);

			res.status(200).json(wordsCount);
		} catch (error) {
			next(error);
		}
	};

	getById = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const foundWord: UserWord = await this.usersWordsService.findById(
				req.user._id,
				wordId
			);
			const foundWordResponseDTO: UserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(foundWord);
			res.status(200).json(foundWordResponseDTO);

		} catch (error) {
			next(error);
		}
	};

	update = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const wordDto = req.validatedBody as UpdateUserWordDto;
			const updatedWord: UserWord = await this.usersWordsService.update(
				req.user._id,
				wordId,
				wordDto
			);

			const updatedWordResponseDTO: UserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(updatedWord);
			res.status(200).json(updatedWordResponseDTO);
		} catch (error) {
			next(error);
		}
	};

	delete = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const deletedWord: UserWord = await this.usersWordsService.delete(
				req.user._id,
				wordId
			);

			const deletedWordResponseDTO: UserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(deletedWord);
			res.status(200).json(deletedWordResponseDTO);
		} catch (error) {
			next(error);
		}
	};
}

