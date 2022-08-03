import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/user.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { LoginDto } from '@dtos/auth.dto';
import { WrongCredentialsException } from '@/exceptions/wrong-credentials.exception';
import { AlreadyExistsException } from '@/exceptions/already-exist.exception';
import { IAuthService } from './auth.service.interface';
import { IUsersRepository } from '@/modules/users/repositories/users.repository.interface';

export class AuthService implements IAuthService {

	constructor(private readonly usersRepository: IUsersRepository) { }

	async signUp({ email, password, name }: CreateUserDto): Promise<User> {
		const existedUser = await this.usersRepository.findByEmail(email);
		if (existedUser) throw new AlreadyExistsException();

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await this.usersRepository.create({
			email,
			name,
			password: hashedPassword,
		});
		newUser.password = null;

		return newUser;
	}

	async logIn({
		email,
		password,
	}: LoginDto): Promise<{ cookie: string; foundUser: User; accessToken: string }> {
		const foundUser = await this.usersRepository.findByEmail(email);
		if (!foundUser) throw new WrongCredentialsException();

		const isPasswordMatching: boolean = await bcrypt.compare(
			password,
			foundUser.password
		);
		if (!isPasswordMatching) {
			throw new WrongCredentialsException();
		}
		const tokenData = this.createToken(foundUser);
		const cookie = this.createCookie(tokenData);

		return { cookie, foundUser, accessToken: tokenData.token };
	}

	async logOut(email: string): Promise<User> {
		const foundUser = await this.usersRepository.findByEmail(email);
		if (!foundUser) throw new WrongCredentialsException();

		return foundUser;
	}

	createToken(user: User): TokenData {
		const dataStoredInToken: DataStoredInToken = { id: user.id };
		const secretKey: string = config.get('secretKey');
		const expiresIn: number = 60 * 60;

		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
		};
	}

	createCookie(tokenData: TokenData): string {
		return `Authorization= Bearer ${tokenData.token}; Max-Age=${tokenData.expiresIn};`;
	}
}

