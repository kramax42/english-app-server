import { UserNotFoundException } from '@/exceptions/user-not-found.exception';
import { CreateUserDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import UsersRepository from './users.repository';
import bcrypt from 'bcrypt';

class UsersService {
	private readonly usersRepository = new UsersRepository();

	public async getAllUsers(): Promise<User[]> {
		const users = await this.usersRepository.getAllUsers();
		return users;
	}

	public async findUserById(userId: string): Promise<User> {
		const foundUser = await this.usersRepository.findUserById(userId);
		if (!foundUser) throw new UserNotFoundException();

		return foundUser;
	}

	public async updateUser(
		userId: string,
		userDto: CreateUserDto
	): Promise<User> {
		const foundUser = await this.usersRepository.findUserById(userId);
		if (!foundUser) throw new UserNotFoundException();

		const { name, email, password } = userDto;
		const hashedPassword = await bcrypt.hash(password, 10);
		const updatedUser = await this.usersRepository.updateUser(userId, {
			name,
			email,
			password: hashedPassword,
		});

		return updatedUser;
	}

	public async deleteUser(userId: string): Promise<User> {
		const foundUser = await this.usersRepository.findUserById(userId);
		if (!foundUser) throw new UserNotFoundException();

		const deletedWord = await this.usersRepository.deleteUser(userId);
		return deletedWord;
	}

	// async validateUser(email: string): Promise<Pick<UserModel, 'email'>> {
	// 	const user = await this.findUser(email);
	// 	if (!user) {
	// 		throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
	// 	}
	// 	// const isCorrectPassword = await compare(password, user.passwordHash);
	// 	// if (!isCorrectPassword) {
	// 	// 	throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
	// 	// }
	// 	return { email: user.email };
	// }

	async findUser(email: string) {
		return this.usersRepository.findUserByEmail(email);
	}
}

export default UsersService;
