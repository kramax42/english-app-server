import { UserNotFoundException } from '@/exceptions/user-not-found.exception';
import { CreateUserDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import bcrypt from 'bcrypt';
import { IUsersRepository } from '../repositories/users.repository.interface';
import { IUsersService } from './users.service.interface';

export class UsersService implements IUsersService {

	constructor(private readonly usersRepository: IUsersRepository) { }

	async findAll(): Promise<User[]> {
		const users = await this.usersRepository.findAll();
		return users;
	}

	async findById(userId: string): Promise<User> {
		const foundUser = await this.usersRepository.findById(userId);
		if (!foundUser) throw new UserNotFoundException();

		return foundUser;
	}

	async update(
		userId: string,
		userDto: CreateUserDto
	): Promise<User> {
		const foundUser = await this.usersRepository.findById(userId);
		if (!foundUser) throw new UserNotFoundException();

		const { name, email, password } = userDto;
		const hashedPassword = await bcrypt.hash(password, 10);
		const updatedUser = await this.usersRepository.update(userId, {
			name,
			email,
			password: hashedPassword,
		});

		return updatedUser;
	}

	async delete(userId: string): Promise<User> {
		const foundUser = await this.usersRepository.findById(userId);
		if (!foundUser) throw new UserNotFoundException();

		const deletedWord = await this.usersRepository.delete(userId);
		return deletedWord;
	}

	async findUser(email: string): Promise<User> {
		return this.usersRepository.findByEmail(email);
	}
}

