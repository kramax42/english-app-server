import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User, UserResponseDTO } from '@interfaces/user.interface';
import { authMiddleware } from '@middlewares/auth.middleware';
import { LoginDto } from '@/dtos/auth.dto';
import { bodyValidator } from '@/middlewares/validation.middleware';
import { IAuthController } from './auth.controller.interface';
import { IAuthService } from '../services/auth.service.interface';

export class AuthController implements IAuthController {
	public path = '/auth';
	public router = Router();

	constructor(private readonly authService: IAuthService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			`${this.path}/sign-up`,
			bodyValidator(CreateUserDto),
			this.signUp
		);
		this.router.post(
			`${this.path}/sign-in`,
			bodyValidator(LoginDto),
			this.signIn
		);
		this.router.delete(`${this.path}/log-out`, authMiddleware(), this.logOut);
		this.router.get(`${this.path}/me`, authMiddleware(), this.me);
	}

	signUp = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const user = req.validatedBody as CreateUserDto;
			const createdUser: User = await this.authService.signUp(user);
			const createdUserResponseDTO: UserResponseDTO = this.authService.transformUserForResponseDTO(createdUser);
			res.status(201).json(createdUserResponseDTO);
		} catch (error) {
			next(error);
		}
	};

	signIn = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const user = req.validatedBody as CreateUserDto;
			const { cookie, foundUser, accessToken } = await this.authService.signIn(
				user
			);
			const foundUserResponseDTO: UserResponseDTO = this.authService.transformUserForResponseDTO(foundUser);

			res.setHeader('Set-Cookie', cookie);
			res.status(200).json({ user: foundUserResponseDTO, accessToken });
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
			const user = req.user as User;
			const logOutUser: User = await this.authService.logOut(
				user.email
			);
			const logOutUserResponseDTO: UserResponseDTO = this.authService.transformUserForResponseDTO(logOutUser);

			res.setHeader('Set-Cookie', ['Authorization=; HttpOnly; SameSite=None; Secure; Max-age=0; Path=/;']);
			res.status(200).json(logOutUserResponseDTO);
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
			const userResponseDTO: UserResponseDTO = this.authService.transformUserForResponseDTO(user);

			res.status(200).json(userResponseDTO);
		} catch (error) {
			next(error);
		}
	};
}

