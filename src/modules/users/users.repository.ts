import { CreateUserDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import { UserModel } from '@models/user.model';

class UsersRepository {
	private userModel = UserModel;

	public async getAllUsers(): Promise<User[]> {
		const users = await this.userModel.find().exec();
		return users;
	}

	public async createUser({
		email,
		name,
		password,
	}: CreateUserDto): Promise<User> {
		const user = await this.userModel.create({
			email,
			name,
			password,
		});
		return user;
	}

	public async findUserById(userId: string): Promise<User | null> {
		const foundUser = await this.userModel.findById(userId).exec();
		return foundUser;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const foundUser = await this.userModel.findOne({ email }).exec();
		return foundUser;
	}

	public async updateUser(
		userId: string,
		userData: CreateUserDto
	): Promise<User> {
		const updatedUser = await this.userModel
			.findByIdAndUpdate(userId, userData, { new: true })
			.exec();

		return updatedUser;
	}

	public async deleteUser(userId: string): Promise<User> {
		const deletedWord = await this.userModel.findByIdAndDelete(userId).exec();
		return deletedWord;
	}
}

export default UsersRepository;
