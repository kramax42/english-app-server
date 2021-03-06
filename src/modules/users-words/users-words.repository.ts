import { UserWordModel } from '@models/user-word.model';
import { UserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';
import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';

class UsersWordsRepository {
	private wordModel = UserWordModel;

	public async findAll(userId: string): Promise<UserWord[]> {
		const words = await this.wordModel.find({ user: userId }).exec();
		return words;
	}

	public async create(
		userId: string,
		{
			word,
			translation,
			transcription,
			usageExamples,
			studyStatus,
		}: CreateUserWordDto
	): Promise<UserWord> {
		console.log(userId);

		const createdWord = await this.wordModel.create({
			user: userId,
			word,
			translation,
			transcription,
			usageExamples,
			studyStatus,
		});
		return createdWord;
	}

	async find(userId: string, word: string) {
		return this.wordModel.findOne({ word, user: userId }).exec();
	}

	async findById(userId: string, wordId: string): Promise<UserWord | null> {
		const foundWord = await this.wordModel
			.findOne({ user: userId, _id: wordId })
			.exec();
		return foundWord;
	}

	async update(
		userId: string,
		wordId: string,
		dto: UpdateUserWordDto
	): Promise<UserWord> {
		const updatedWord = await this.wordModel
			.findOneAndUpdate({ _id: wordId, user: userId }, dto, { new: true })
			.exec();

		return updatedWord;
	}

	async delete(userId: string, wordId: string): Promise<UserWord> {
		const deletedWord = await this.wordModel
			.findOneAndDelete({ _id: wordId, user: userId })
			.exec();
		return deletedWord;
	}
}

export default UsersWordsRepository;
