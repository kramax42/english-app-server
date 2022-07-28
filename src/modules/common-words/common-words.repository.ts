import { CommonWordModel } from '@models/common-word.model';
import { CommonWord } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';

class CommonWordsRepository {
	private wordModel = CommonWordModel;

	public async findAll(
		documentsToSkip: number = 0,
		limitOfDocuments: number | undefined
	): Promise<CommonWord[]> {
		const findQuery = this.wordModel
			.find()
			.sort({ _id: 1 })
			.skip(documentsToSkip);

		if (limitOfDocuments) {
			findQuery.limit(limitOfDocuments);
		}

		const words = await findQuery;

		return words;
	}

	public async create({
		word,
		translations,
		definitions,
		transcription,
		usageExamples,
	}: CreateCommonWordDto): Promise<CommonWord> {
		const createdWord = await this.wordModel.create({
			word,
			translations,
			definitions,
			transcription,
			usageExamples,
		});
		return createdWord;
	}

	async find(word: string) {
		return this.wordModel.findOne({ word }).exec();
	}

	async count(): Promise<number> {
		// return this.wordModel.countDocuments({}).exec();
		return this.wordModel.estimatedDocumentCount().exec();
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
