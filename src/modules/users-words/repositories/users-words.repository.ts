import { UserWordModel } from '@models/user-word.model';
import { IUserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';
import { IUsersWordsRepository } from './users-words.repository.interface';

export class UsersWordsRepository implements IUsersWordsRepository {
	private wordModel = UserWordModel;

	public async findAll(userId: string, skip: number = 0,
		limit: number | undefined): Promise<IUserWord[]> {

		const findQuery = this.wordModel
			.find({ user: userId })
			.sort({ _id: 1 })
			.skip(skip);

		if (limit) {
			findQuery.limit(limit);
		}

		// const explain = await findQuery.explain();
		// console.log(explain)

		const words = await findQuery;

		return words;
	}

	async count(userId: string): Promise<number> {
		// return (await this.wordModel.find({ user: userId }).exec()).length;
		return this.wordModel.countDocuments({ user: userId });
	}

	public async create(userId: string, createUserWordDto: CreateUserWordDto): Promise<IUserWord> {

		const createdWord = await this.wordModel.create({
			user: userId,
			...createUserWordDto,
		});
		return createdWord;
	}

	async find(userId: string, word: string) {
		return this.wordModel.findOne({ word, user: userId }).exec();
	}

	async findById(userId: string, wordId: string): Promise<IUserWord | null> {
		const foundWord = await this.wordModel
			.findOne({ user: userId, _id: wordId })
			.exec();
		return foundWord;
	}

	async getPageByLetter(userId: string, letter: string, limit: number): Promise<number> {
		const indexPosition = await (await this.wordModel.find({ user: userId, normalizedWord: { "$lt": letter.toLowerCase() } })).length;
		const page = Math.ceil(indexPosition / limit);
		return page;
	}

	async update(
		userId: string,
		wordId: string,
		updateUserWordDto: UpdateUserWordDto
	): Promise<IUserWord> {
		const updatedWord = await this.wordModel
			.findOneAndUpdate({ _id: wordId, user: userId }, updateUserWordDto, { new: true })
			.exec();

		return updatedWord;
	}

	async delete(userId: string, wordId: string): Promise<IUserWord> {
		const deletedWord = await this.wordModel
			.findOneAndDelete({ _id: wordId, user: userId })
			.exec();
		return deletedWord;
	}
}

