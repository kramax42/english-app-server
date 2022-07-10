import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import UserModel from '@models/user.model';

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
		const user = await this.userModel.findOne({ id: userId }).exec();
		return user || null;
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
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
