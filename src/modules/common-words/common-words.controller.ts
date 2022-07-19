import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '@interfaces/contoller.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateCommonWordDto, UpdateCommonWordDto } from '@/dtos/common-word.dto';
import { CommonWord } from '@/interfaces/common-word.interface';
import CommonWordsService from './common-words.service';
import { PaginationParamsDto } from '@/dtos/pagination-params.dto';
import { bodyValidator, queryValidator } from '@/middlewares/validation.middleware';

class CommonWordsController implements Controller {
	public path = '/words';
	public router = Router();

	public commonWordsService = new CommonWordsService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`,
		queryValidator(PaginationParamsDto),
		  this.findAll);
		this.router.post(`${this.path}`, authMiddleware, bodyValidator(CreateCommonWordDto), this.create);
		this.router.get(`${this.path}/:id`, authMiddleware, this.getById);
		this.router.put(
			`${this.path}/:id`,
			authMiddleware,
			bodyValidator(UpdateCommonWordDto),
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
			const wordDto = req.validatedBody as CreateCommonWordDto;
			const createdWord: CommonWord = await this.commonWordsService.create(wordDto);

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
			const query = req.validatedQuery as PaginationParamsDto;
			
			const words: CommonWord[] = await this.commonWordsService.findAll(query.skip, query.limit);

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
			const foundWord: CommonWord = await this.commonWordsService.findById(
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
			const wordDto = req.validatedBody as UpdateCommonWordDto;
			
			const updatedWord: CommonWord = await this.commonWordsService.update(
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
			const deletedWord: CommonWord = await this.commonWordsService.delete(
				id
			);

			res.status(200).json({ data: deletedWord, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default CommonWordsController;
