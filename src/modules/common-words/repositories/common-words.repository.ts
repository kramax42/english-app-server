import mongoose, { ClientSession } from 'mongoose';
import { CommonWordModel } from '@models/common-word.model';
import { ICommonWord, ICommonWordWithUserWordResponseDto, WordLevel } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { ICommonWordsRepository } from './common-words.repository.interface';
import { ILetterPosition, IWordsInfo, WordsInfoModel } from '@/models/words-info.model';
import { IWordsInfoRepository } from '@/modules/words-info/repositories/words-info.repository.interface';

export class CommonWordsRepository implements ICommonWordsRepository {
	private wordModel = CommonWordModel;
	private wordsInfoModel = WordsInfoModel;

	constructor(private readonly wordsInfoRepository: IWordsInfoRepository) { }

	async findAll(
		skip: number,
		limit: number | null,
		userId?: string
	): Promise<ICommonWordWithUserWordResponseDto[]> {


		const aggregate = this.wordModel.aggregate([
			{ $sort: { normalizedWord: 1 } },
			{ $skip: skip },
			{ $limit: limit || 5 },
			{
				//https://stackoverflow.com/questions/51010754/add-only-a-field-from-another-collection-in-mongodb
				$lookup: {
					from: "userwords",
					let: { thisSessionUserId: new mongoose.Types.ObjectId(userId), commonWord: '$word' },
					pipeline: [
						{
							$match:
							{
								$expr:
								{
									$and:
										[
											{ $eq: ["$word", "$$commonWord"] },
											{ $eq: ["$user", "$$thisSessionUserId"] }
										]
								}
							}
						}
					],
					as: "userWord"
				}
			},
			{
				$addFields: {
					id: "$_id",
				}
			},
			{
				$unwind: {
					path: "$userWord",
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					_id: 0,
					__v: 0,
					"userWord._id": 0,
					"userWord.__v": 0,
					"userWord.user": 0,
				}
			},
		]
			// , {
			// 	collation: {
			// 		locale: "en",
			// 		caseLevel: true,
			// 	}
			// }
		);

		// for (const word of words) {
		// 	const userWord = await this.userWordModel.findOne({ commonWord: word._id });
		// 	results.push({
		// 		commonWord: word,
		// 		userStudyStatus: userWord ? userWord.studyStatus : WordStudyStatus.UNKNOWN
		// 	});
		// }

		// return Promise.all(results);

		// TODO: Remove it later!!!.
		const tmp: ICommonWordWithUserWordResponseDto[] = await aggregate.exec()
		const results = tmp.map(resp => {
			resp.meanings.map(meaning => {
				meaning.level = meaning.level.toUpperCase() as WordLevel;
				return meaning
			})
			return resp
		})
		// const results: ICommonWordWithUserWordResponseDto[] = await aggregate.exec();
		return results;
	}

	async create(createCommonWordDto: CreateCommonWordDto): Promise<ICommonWord | null> {
		const session: ClientSession = await mongoose.startSession();

		session.startTransaction();
		let createdWord = null;
		try {
			createdWord = await this.wordModel.create(createCommonWordDto);

			const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc();
			wordsInfoDoc.commonWords.amount = wordsInfoDoc.commonWords.amount + 1;
			await wordsInfoDoc.save();

			await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter: createdWord.normalizedWord.charAt(0), updateMode: 'create' });
			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
			return createdWord;
		}
	}

	
	async find(word: string) {
		return this.wordModel.findOne({ word }).exec();
	}

	async count(): Promise<number> {
		// this.fullUpdateWordsMap();
		// return this.wordModel.estimatedDocumentCount().exec();
		const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc();
		return wordsInfoDoc.commonWords.amount;
	}

	async findById(id: string): Promise<ICommonWord | null> {
		const foundWord = await this.wordModel.findById(id).exec();
		return foundWord;
	}

	async getPageByLetter(letter: string, limit: number): Promise<number> {
		// const indexPosition = await (await this.wordModel.find({ normalizedWord: { "$lt": letter.toLowerCase() } })).length;
		const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc();
		const indexPosition = wordsInfoDoc.commonWords.letterPositions.filter(lp => lp.letter == letter.toLowerCase())[0].position;
		const page = Math.ceil((indexPosition + 1) / limit);
		return page;
	}

	

	async update(id: string, dto: UpdateCommonWordDto): Promise<ICommonWord> {
		const session: ClientSession = await mongoose.startSession();

		session.startTransaction();
		const existedWord = await this.wordModel.findById(id)
		const updatedWord = await this.wordModel.findByIdAndUpdate(id, dto, { new: true })
		try {
			const prevLetter = existedWord.normalizedWord.charAt(0);
			const letter = updatedWord.normalizedWord.charAt(0);
			if (letter !== prevLetter) {
				await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter, prevLetter, updateMode: 'update' });
			}
			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
			return updatedWord;
		}
	}

	async delete(id: string): Promise<ICommonWord | null> {
		const session: ClientSession = await mongoose.startSession();
		session.startTransaction();
		let deletedWord = null;
		try {
			deletedWord = await this.wordModel.findByIdAndDelete(id).exec();

			const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc();
			wordsInfoDoc.commonWords.amount = wordsInfoDoc.commonWords.amount - 1;
			await wordsInfoDoc.save();

			await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter: deletedWord.normalizedWord.charAt(0), updateMode: 'delete' });
			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
			return deletedWord;
		}

	}
}

