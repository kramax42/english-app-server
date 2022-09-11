import { NextFunction, Response, Router } from 'express';
import { CreateUserWordDto, UpdateUserWordDto } from '@/dtos/user-word.dto';
import { IUserWord, IUserWordResponseDto } from '@/interfaces/user-word.interface';
import {
	bodyValidator,
	queryValidator,
} from '@/middlewares/validation.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { PaginationParamsDto } from '@/dtos/pagination-params.dto';
import { IUsersWordsService } from '../services/users-words.service.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { IController } from '@/interfaces/contoller.interface';
import { GetPageByLetterDto } from '@/dtos/page-by-letter.dto';

export class UsersWordsController implements IController {
	public path = '/user-words';
	public router = Router();

	constructor(private readonly usersWordsService: IUsersWordsService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware(), queryValidator(PaginationParamsDto), this.findAll);
		this.router.get(`${this.path}/count`, authMiddleware(), this.count);
		this.router.get(`${this.path}/getPageByLetter`, authMiddleware(), queryValidator(GetPageByLetterDto), this.getPageByLetter);
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
			

			const createdWord: IUserWord = await this.usersWordsService.create(
				req.user._id,
				wordDto
			);
			
			const createdWordResponseDTO: IUserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(createdWord);
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
			const words: IUserWord[] = await this.usersWordsService.findAll(
				req.user._id,
				query.skip,
				query.limit
			);

			const wordsResponseDTO: IUserWordResponseDto[] = words.map(word => {
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
			const foundWord: IUserWord = await this.usersWordsService.findById(
				req.user._id,
				wordId
			);
			const foundWordResponseDTO: IUserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(foundWord);
			res.status(200).json(foundWordResponseDTO);

		} catch (error) {
			next(error);
		}
	};

	getPageByLetter = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const letter = req.query.letter;
			const limit = req.query.limit;
			const page: number = await this.usersWordsService.getPageByLetter(req.user._id, letter || letter[0], limit || limit[0]);
			res.status(200).json(page);
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
			const updatedWord: IUserWord = await this.usersWordsService.update(
				req.user._id,
				wordId,
				wordDto
			);

			const updatedWordResponseDTO: IUserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(updatedWord);
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
			const deletedWord: IUserWord = await this.usersWordsService.delete(
				req.user._id,
				wordId
			);

			const deletedWordResponseDTO: IUserWordResponseDto = this.usersWordsService.transformUserWordForResponseDTO(deletedWord);
			res.status(200).json(deletedWordResponseDTO);
		} catch (error) {
			next(error);
		}
	};
}

