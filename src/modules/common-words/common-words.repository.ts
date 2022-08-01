import { CommonWordModel } from '@models/common-word.model';
import { CommonWord, CommonWordWithUserStudyStatus } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { UserWordModel } from '@/models/user-word.model';
import { WordStudyStatus } from '@/interfaces/user-word.interface';



class CommonWordsRepository {
	private userWordModel = UserWordModel;
	private wordModel = CommonWordModel;

	public async findAll(
		skip: number = 0,
		limit: number | undefined
	): Promise<CommonWordWithUserStudyStatus[]> {
		const findQuery = this.wordModel
			.find()
			.sort({ _id: 1 })
			.skip(skip)

		if (limit) {
			findQuery.limit(limit);
		}
		const words = await findQuery;

		const results: CommonWordWithUserStudyStatus[] = [];

		for (const word of words) {
			const userWord = await this.userWordModel.findOne({ commonWord: word._id });
			results.push({
				commonWord: word,
				userStudyStatus: userWord ? userWord.studyStatus : WordStudyStatus.UNKNOWN
			});
		}

		return Promise.all(results);
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
