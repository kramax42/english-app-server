import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import validationMiddleware from '@middlewares/validation.middleware';
import { Controller } from '@interfaces/contoller.interface';

class UsersController implements Controller {
	public path = '/users';
	public router = Router();

	public userService = new userService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.getUsers);
		this.router.get(`${this.path}/:id`, this.getUserById);
		this.router.post(
			`${this.path}`,
			validationMiddleware(CreateUserDto, 'body'),
			this.createUser
		);
		this.router.put(
			`${this.path}/:id`,
			validationMiddleware(CreateUserDto, 'body', true),
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
			const findAllUsersData: User[] = await this.userService.findAllUser();

			res.status(200).json({ data: findAllUsersData, message: 'findAll' });
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

	private createUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userData: CreateUserDto = req.body;
			const createUserData: User = await this.userService.createUser(userData);

			res.status(201).json({ data: createUserData, message: 'created' });
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
			const userData: CreateUserDto = req.body;
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
