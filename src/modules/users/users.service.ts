
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userRepository from '@models/user.model';
import UsersRepository from './users.repository';

class UsersService {

	private readonly usersRepository = new UsersRepository();

	public async getAllUsers(): Promise<User[]> {
		const users = await this.usersRepository.getAllUsers();
		return users;
	}

	public async findUserById(userId: string): Promise<User> {
		const findedUser = await this.usersRepository.findUserById(userId);
		if (!findedUser) throw new HttpException(409, "You're not user");

		return findedUser;
	}
	

	public async updateUser(
		userId: string,
		userDto: CreateUserDto
	): Promise<User> {
		const findedUser = await this.usersRepository.findUserById(userId);
		if (!findedUser) throw new HttpException(409, "You're not user");

		const updatedUser = await this.usersRepository.updateUser(userId, userDto);

		return updatedUser;
	}

	public async deleteUser(userId: string): Promise<User> {
		const findedUser = await this.usersRepository.findUserById(userId);
		if (!findedUser) throw new HttpException(409, "You're not user");

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
		return userRepository.findOne({ email }).exec();
	}
}

export default UsersService;
