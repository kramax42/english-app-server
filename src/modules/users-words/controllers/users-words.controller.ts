import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserWordDto, UpdateUserWordDto } from '@/dtos/user-word.dto';
import { UserWord } from '@/interfaces/user-word.interface';
import {
	bodyValidator,
	queryValidator,
} from '@/middlewares/validation.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PaginationParamsDto } from '@/dtos/pagination-params.dto';
import { IUsersWordsService } from '../services/users-words.service.interface';
import { IUserWordsController } from './users-words.controller.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';

export class UsersWordsController implements IUserWordsController {
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

			res.status(201).json(createdWord);
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

			res.status(200).json(words);
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

			res.status(200).json(foundWord);
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

			res.status(200).json(updatedWord);
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

			res.status(200).json(deletedWord);
		} catch (error) {
			next(error);
		}
	};
}

