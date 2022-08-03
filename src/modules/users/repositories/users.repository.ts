import { CreateUserDto } from "@/dtos/user.dto";
import { User } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user.model";
import { IUsersRepository } from "./users.repository.interface";

export class UsersRepository implements IUsersRepository {
	private userModel = UserModel;

	async findAll(): Promise<User[]> {
		const users = await this.userModel.find().exec();
		return users;
	}

	async create({
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

	async findById(userId: string): Promise<User | null> {
		const foundUser = await this.userModel.findById(userId).exec();
		return foundUser;
	}

	async findByEmail(email: string): Promise<User | null> {
		const foundUser = await this.userModel.findOne({ email }).exec();
		return foundUser;
	}

	async update(
		userId: string,
		userData: CreateUserDto
	): Promise<User> {
		const updatedUser = await this.userModel
			.findByIdAndUpdate(userId, userData, { new: true })
			.exec();

		return updatedUser;
	}

	async delete(userId: string): Promise<User> {
		const deletedWord = await this.userModel.findByIdAndDelete(userId).exec();
		return deletedWord;
	}
}

