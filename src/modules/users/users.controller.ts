import { NextFunction, Request, Response, Router } from 'express';
import { UpdateUserDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import UsersService from './users.service';
import { Controller } from '@interfaces/contoller.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { bodyValidator } from '@/middlewares/validation.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ForbiddenException } from '@/exceptions/forbidden.exception';

class UsersController implements Controller {
	public path = '/users';
	public router = Router();

	public userService = new UsersService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
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

	private findAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const getAllUsersData: User[] = await this.userService.findAll();

			res
				.status(200)
				.json({ data: getAllUsersData, message: 'Get all users.' });
		} catch (error) {
			next(error);
		}
	};

	private findById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.params.id;
			const findOneUserData: User = await this.userService.findById(userId);

			res.status(200).json({ data: findOneUserData, message: 'findOne' });
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
			const userId = req.params.id;

			if(userId !== req.user._id) {
				throw new ForbiddenException();
			}

			const userData: UpdateUserDto = req.body;
			const updatedUser: User = await this.userService.update(
				userId,
				userData
			);

			res.status(200).json({ data: updatedUser, message: 'updated' });
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
			const userId = req.params.id;
			const deletedUser: User = await this.userService.delete(userId);

			res.status(200).json({ data: deletedUser, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default UsersController;
