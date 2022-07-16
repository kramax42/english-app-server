import { CommonWordModel } from '@models/common-word.model';
import { CommonWord } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';

class CommonWordsRepository {
	private wordModel = CommonWordModel;

	public async findAll(): Promise<CommonWord[]> {
		const words = await this.wordModel.find().exec();
		return words;
	}

	public async create({
		word,
		translation,
		transcription,
		usageExamples,
	}: CreateCommonWordDto): Promise<CommonWord> {
		const createdWord = await this.wordModel.create({
			word,
			translation,
			transcription,
			usageExamples,
		});
		return createdWord;
	}

	async find(word: string) {
		return this.wordModel.findOne({ word }).exec();
	}

	async findById(id: string): Promise<CommonWord | null> {
		const foundWord = await this.wordModel.findById(id).exec();
		return foundWord;
	}

	async update(id: string, dto: UpdateCommonWordDto): Promise<CommonWord> {
		const updatedWord = await this.wordModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();

		return updatedWord;
	}

	async delete(id: string): Promise<CommonWord> {
		const deletedWord = await this.wordModel.findByIdAndDelete(id).exec();
		return deletedWord;
	}
}

export default CommonWordsRepository;
