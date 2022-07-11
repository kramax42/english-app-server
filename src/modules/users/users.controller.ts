import { NextFunction, Request, Response, Router } from 'express';
import { UpdateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import UsersService from './users.service';
import validationMiddleware from '@middlewares/validation.middleware';
import { Controller } from '@interfaces/contoller.interface';

class UsersController implements Controller {
	public path = '/users';
	public router = Router();

	public userService = new UsersService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.getUsers);
		this.router.get(`${this.path}/:id`, this.getUserById);
		this.router.put(
			`${this.path}/:id`,
			validationMiddleware(UpdateUserDto, 'body', true),
			this.updateUser
		);
		this.router.delete(`${this.path}/:id`, this.deleteUser);
	}

	private getUsers = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const getAllUsersData: User[] = await this.userService.getAllUsers();

			res.status(200).json({ data: getAllUsersData, message: 'Get all users.' });
		} catch (error) {
			next(error);
		}
	};

	private getUserById = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.params.id;
			const findOneUserData: User = await this.userService.findUserById(userId);

			res.status(200).json({ data: findOneUserData, message: 'findOne' });
		} catch (error) {
			next(error);
		}
	};

	private updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.params.id;
			const userData: UpdateUserDto = req.body;
			const updatedUser: User = await this.userService.updateUser(
				userId,
				userData
			);
				
			res.status(200).json({ data: updatedUser, message: 'updated' });
		} catch (error) {
			next(error);
		}
	};

	private deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.params.id;
			const deletedUser: User = await this.userService.deleteUser(userId);

			res.status(200).json({ data: deletedUser, message: 'deleted' });
		} catch (error) {
			next(error);
		}
	};
}

export default UsersController;
