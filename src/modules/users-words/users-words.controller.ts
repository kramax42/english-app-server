import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { Controller } from '@interfaces/contoller.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateUserWordDto, UpdateUserWordDto } from '@/dtos/user-word.dto';
import { UserWord } from '@/interfaces/user-word.interface';
import UsersWordsService from './users-words.service';

class UsersWordsController implements Controller {
	public path = '/user-words';
	public router = Router();

	public UsersWordsService = new UsersWordsService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, this.findAll);
		this.router.post(`${this.path}`, authMiddleware, this.create);
		this.router.get(`${this.path}/:id`, authMiddleware, this.getById);
		this.router.put(
			`${this.path}/:id`,
			authMiddleware,
			validationMiddleware(UpdateUserWordDto, 'body', true),
			this.update
		);
		this.router.delete(`${this.path}/:id`, authMiddleware, this.delete);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordDto: CreateUserWordDto = req.body;
			const createdWord: UserWord = await this.UsersWordsService.create(wordDto);

			res.status(201).json({ data: createdWord, message: 'Word created' });
		} catch (error) {
			next(error);
		}
	};


	private findAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const words: UserWord[] = await this.UsersWordsService.findAll();

			res.status(200).json({ data: words, message: 'Get all words.' });
		} catch (error) {
			next(error);
		}
	};

	private getById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const foundWord: UserWord = await this.UsersWordsService.findById(
				id
			);

			res.status(200).json({ data: foundWord, message: 'Found word' });
		} catch (error) {
			next(error);
		}
	};

	private update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const wordDto: UpdateUserWordDto = req.body;
			const updatedWord: UserWord = await this.UsersWordsService.update(
				id,
				wordDto
			);

			res.status(200).json({ data: updatedWord, message: 'Word updated.' });
		} catch (error) {
			next(error);
		}
	};

	private delete = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const deletedWord: UserWord = await this.UsersWordsService.delete(
				id
			);

			res.status(200).json({ data: deletedWord, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default UsersWordsController;
