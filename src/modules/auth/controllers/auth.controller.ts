import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';

import authMiddleware from '@middlewares/auth.middleware';
import { LoginDto } from '@/dtos/auth.dto';
import { bodyValidator } from '@/middlewares/validation.middleware';
import { IAuthController } from './auth.controller.interface';
import { IAuthService } from '../services/auth.service.interface';

export class AuthController implements IAuthController {
	public path = '/';
	public router = Router();

	constructor(private readonly authService: IAuthService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			`${this.path}signup`,
			bodyValidator(CreateUserDto),
			this.signUp
		);
		this.router.post(
			`${this.path}login`,
			bodyValidator(LoginDto),
			this.logIn
		);
		this.router.delete(`${this.path}logout`, authMiddleware, this.logOut);
		this.router.get(`${this.path}me`, authMiddleware, this.me);
	}

	signUp = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userData = req.validatedBody as CreateUserDto;
			const signUpUserData: User = await this.authService.signUp(userData);

			res.status(201).json(signUpUserData);
		} catch (error) {
			next(error);
		}
	};

	logIn = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userData = req.validatedBody as CreateUserDto;
			const { cookie, foundUser: user, accessToken } = await this.authService.logIn(
				userData
			);

			const returnedUser = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			}


			res.setHeader('Set-Cookie', cookie);

			// Set cookie value in body for auth in e2e tests.
			res
				.status(200)
				.json({ user: returnedUser, accessToken });
		} catch (error) {
			next(error);
		}
	};

	logOut = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userData = req.user as User;
			const logOutUserData: User = await this.authService.logOut(
				userData.email
			);

			res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
			res.status(200).json(logOutUserData);
		} catch (error) {
			next(error);
		}
	};

	me = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const user = req.user as User;

			const returnedUser = {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			}

			res.status(200).json(returnedUser);
		} catch (error) {
			next(error);
		}
	};
}
