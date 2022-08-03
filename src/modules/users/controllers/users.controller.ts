import { NextFunction, Request, Response, Router } from 'express';
import { UpdateUserDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';

import authMiddleware from '@middlewares/auth.middleware';
import { bodyValidator } from '@middlewares/validation.middleware';
import { RequestWithUser } from '@interfaces/auth.interface';
import { ForbiddenException } from '@exceptions/forbidden.exception';
import { IUsersController } from './users.controllers.interface';
import { IUsersService } from '../services/users.service.interface';


export class UsersController implements IUsersController {
	public path = '/users';
	public router = Router();

	constructor(private readonly usersService: IUsersService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, this.findAll);
		this.router.get(`${this.path}/:id`, authMiddleware, this.findById);
		this.router.patch(
			`${this.path}/:id`,
			authMiddleware,
			bodyValidator(UpdateUserDto),
			this.update
		);
		this.router.delete(`${this.path}/:id`, authMiddleware, this.delete);
	}

	findAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const getAllUsersData: User[] = await this.usersService.findAll();

			res
				.status(200)
				.json({ data: getAllUsersData, message: 'Get all users.' });
		} catch (error) {
			next(error);
		}
	};

	findById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.params.id;
			const foundUser: User = await this.usersService.findById(userId);

			res.status(200).json(foundUser);
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
			const userId = req.params.id;

			if (userId !== req.user.id) {
				throw new ForbiddenException();
			}

			const userData: UpdateUserDto = req.body;
			const updatedUser: User = await this.usersService.update(userId, userData);

			res.status(200).json(updatedUser);
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
			const userId = req.params.id;
			const deletedUser: User = await this.usersService.delete(userId);

			res.status(200).json(deletedUser);
		} catch (error) {
			next(error);
		}
	};
}

