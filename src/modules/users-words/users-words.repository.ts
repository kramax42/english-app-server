import { UserWordModel } from '@models/user-word.model';
import { UserWord } from '@interfaces/user-word.interface';
import {
	CreateUserWordDto,
	UpdateUserWordDto,
} from '@dtos/user-word.dto';

class UsersWordsRepository {
	private wordModel = UserWordModel;

	public async findAll(): Promise<UserWord[]> {
		const words = await this.wordModel.find().exec();
		return words;
	}

	public async create({
		word,
		translation,
		transcription,
		usageExamples,
		studyStatus
	}: CreateUserWordDto): Promise<UserWord> {
		const createdWord = await this.wordModel.create({
			word,
			translation,
			transcription,
			usageExamples,
			studyStatus
		});
		return createdWord;
	}

	async find(word: string) {
		return this.wordModel.findOne({ word }).exec();
	}

	async findById(id: string): Promise<UserWord | null> {
		const foundWord = await this.wordModel.findById(id).exec();
		return foundWord;
	}

	async update(id: string, dto: UpdateUserWordDto): Promise<UserWord> {
		const updatedWord = await this.wordModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();

		return updatedWord;
	}

	async delete(id: string): Promise<UserWord> {
		const deletedWord = await this.wordModel.findByIdAndDelete(id).exec();
		return deletedWord;
	}
}

export default UsersWordsRepository;
