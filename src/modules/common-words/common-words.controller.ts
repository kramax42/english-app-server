import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { Controller } from '@interfaces/contoller.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateCommonWordDto, UpdateCommonWordDto } from '@/dtos/common-word.dto';
import { CommonWord } from '@/interfaces/common-word.interface';
import CommonWordsService from './common-words.service';

class CommonWordsController implements Controller {
	public path = '/words';
	public router = Router();

	public commonWordsService = new CommonWordsService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, this.getAllWords);
		this.router.post(`${this.path}`, authMiddleware, this.createWord);
		this.router.get(`${this.path}/:id`, authMiddleware, this.getWordById);
		this.router.put(
			`${this.path}/:id`,
			authMiddleware,
			validationMiddleware(UpdateCommonWordDto, 'body', true),
			this.updateWord
		);
		this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteWord);
	}

	private 	createWord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const wordDto: CreateCommonWordDto = req.body;
			const createdWord: CommonWord = await this.commonWordsService.createWord(wordDto);

			res.status(201).json({ data: createdWord, message: 'Word created' });
		} catch (error) {
			next(error);
		}
	};


	private getAllWords = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const words: CommonWord[] = await this.commonWordsService.getAllWords();

			res.status(200).json({ data: words, message: 'Get all words.' });
		} catch (error) {
			next(error);
		}
	};

	private getWordById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const foundWord: CommonWord = await this.commonWordsService.findWordById(
				id
			);

			res.status(200).json({ data: foundWord, message: 'Found word' });
		} catch (error) {
			next(error);
		}
	};

	private updateWord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const wordDto: UpdateCommonWordDto = req.body;
			const updatedWord: CommonWord = await this.commonWordsService.updateWord(
				id,
				wordDto
			);

			res.status(200).json({ data: updatedWord, message: 'Word updated.' });
		} catch (error) {
			next(error);
		}
	};

	private deleteWord = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const id = req.params.id;
			const deletedWord: CommonWord = await this.commonWordsService.deleteWord(
				id
			);

			res.status(200).json({ data: deletedWord, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default CommonWordsController;
