import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import userRepository from '@models/user.model';
import { LoginDto } from '@dtos/auth.dto';
import UsersRepository from '@modules/users/users.repository';
class AuthService {
	private readonly usersRepository = new UsersRepository();

	public async signup({ email, password, name }: CreateUserDto): Promise<User> {
		const existedUser = await this.usersRepository.findUserByEmail(email);
		if (existedUser)
			throw new HttpException(409, 'User with this email alredy exist');

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await this.usersRepository.createUser({
			email,
			name,
			password: hashedPassword,
		});
		newUser.password = null;

		return newUser;
	}

	public async login(
		{ email, password}: LoginDto
	): Promise<{ cookie: string; findedUser: User }> {

		const findedUser = await this.usersRepository.findUserByEmail(email);
		if (!findedUser) throw new HttpException(403, `Incorrect credentials`);

		const isPasswordMatching: boolean = await bcrypt.compare(
			password,
			findedUser.password
		);
		if (!isPasswordMatching){
			throw new HttpException(409, "You're password not matching");
		}
		const tokenData = this.createToken(findedUser);
		const cookie = this.createCookie(tokenData);

		return { cookie, findedUser };
	}

	public async logout(email: string): Promise<User> {

		const findedUser = await this.usersRepository.findUserByEmail(email);
		if (!findedUser) throw new HttpException(403, `Incorrect credentials`);

		return findedUser;
	}

	public createToken(user: User): TokenData {
		const dataStoredInToken: DataStoredInToken = { id: user._id };
		const secretKey: string = config.get('secretKey');
		const expiresIn: number = 60 * 60;

		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
		};
	}

	public createCookie(tokenData: TokenData): string {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
	}
}

export default AuthService;
