import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '@interfaces/contoller.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateUserWordDto, UpdateUserWordDto } from '@/dtos/user-word.dto';
import { UserWord } from '@/interfaces/user-word.interface';
import UsersWordsService from './users-words.service';
import { bodyValidator } from '@/middlewares/validation.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';

class UsersWordsController implements Controller {
	public path = '/user-words';
	public router = Router();

	public UsersWordsService = new UsersWordsService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, this.findAll);
		this.router.post(
			`${this.path}`,
			authMiddleware,
			bodyValidator(UpdateUserWordDto),
			this.create
		);
		this.router.get(`${this.path}/:id`, authMiddleware, this.getById);
		this.router.patch(
			`${this.path}/:id`,
			authMiddleware,
			bodyValidator(UpdateUserWordDto),
			this.update
		);
		this.router.delete(`${this.path}/:id`, authMiddleware, this.delete);
	}

	private create = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordDto = req.validatedBody as CreateUserWordDto;
			const createdWord: UserWord = await this.UsersWordsService.create(
				req.user.id,
				wordDto
			);

			res.status(201).json(createdWord);
		} catch (error) {
			next(error);
		}
	};

	private findAll = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const words: UserWord[] = await this.UsersWordsService.findAll(
				req.user.id
			);

			res.status(200).json(words);
		} catch (error) {
			next(error);
		}
	};

	private getById = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const foundWord: UserWord = await this.UsersWordsService.findById(
				req.user.id,
				wordId
			);

			res.status(200).json(foundWord);
		} catch (error) {
			next(error);
		}
	};

	private update = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const wordDto = req.validatedBody as UpdateUserWordDto;
			const updatedWord: UserWord = await this.UsersWordsService.update(
				req.user.id,
				wordId,
				wordDto
			);

			res.status(200).json(updatedWord);
		} catch (error) {
			next(error);
		}
	};

	private delete = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordId = req.params.id;
			const deletedWord: UserWord = await this.UsersWordsService.delete(
				req.user.id,
				wordId
			);

			res.status(200).json(deletedWord);
		} catch (error) {
			next(error);
		}
	};
}

export default UsersWordsController;
