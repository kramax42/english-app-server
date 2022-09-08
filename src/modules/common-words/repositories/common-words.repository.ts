import mongoose, { ClientSession } from 'mongoose';
import { CommonWordModel } from '@models/common-word.model';
import { ICommonWord, ICommonWordWithUserWordResponseDto } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { ICommonWordsRepository } from './common-words.repository.interface';
import { IWordsInfo, WordsInfoModel } from '@/models/words-info.model';

export class CommonWordsRepository implements ICommonWordsRepository {
	private wordModel = CommonWordModel;
	private wordsInfoModel = WordsInfoModel;

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
			}
		], {
			collation: {
				locale: "en"
			}
		});

		// for (const word of words) {
		// 	const userWord = await this.userWordModel.findOne({ commonWord: word._id });
		// 	results.push({
		// 		commonWord: word,
		// 		userStudyStatus: userWord ? userWord.studyStatus : WordStudyStatus.UNKNOWN
		// 	});
		// }

		// return Promise.all(results);

		const results: ICommonWordWithUserWordResponseDto[] = await aggregate.exec();
		return results;
	}

	async create(createCommonWordDto: CreateCommonWordDto): Promise<ICommonWord | null> {
		const session: ClientSession = await mongoose.startSession();

		session.startTransaction();
		let createdWord = null;
		try {
			createdWord = await this.wordModel.create(createCommonWordDto);

			const wordsInfoDoc = (await this.wordsInfoModel.find({}))[0];
			wordsInfoDoc.commonWords.amount = wordsInfoDoc.commonWords.amount + 1;
			await wordsInfoDoc.save();

			await this.updateWordInfoLetterPositions({ letter: createdWord.normalizedWord.charAt(0), updateMode: 'create' });
			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
			return createdWord;
		}
	}

	async getWordsInfoDoc() {
		// Only one document in commonwords collection.
		const wordsInfoDoc = (await this.wordsInfoModel.find({}))[0];
		return wordsInfoDoc;
	}

	async updateWordInfoLetterPositions({ letter, prevLetter, updateMode }
		: {
			letter: string,
			prevLetter?: string,
			updateMode: 'create' | 'update' | 'delete',
		}) {
		const wordsInfoDoc = await this.getWordsInfoDoc();

		const letterPositions = wordsInfoDoc.commonWords.letterPositions;
		let newLetterPositions = letterPositions;

		switch (updateMode) {
			case 'create':
				// Check existence letter in letterPositions array
				if (!(letterPositions.filter(lp => lp.letter === letter).length > 0)) {
					letterPositions.push({
						letter: letter,
						position: await (await this.wordModel.find({ normalizedWord: { "$lt": letter } })).length,
						wordsAmount: 0,
					})
				}

				newLetterPositions = letterPositions.map(letterPosition => {
					const newLetterPosition = letterPosition;

					if (letterPosition.letter == letter) {
						newLetterPosition.wordsAmount = ++letterPosition.wordsAmount;
					}

					if (letterPosition.letter > letter) {
						newLetterPosition.position = ++letterPosition.position;
					}
					return newLetterPosition;
				}).sort((a, b) => a.letter.localeCompare(b.letter));
				break;
			case 'delete':
				// Check existence letter in letterPositions array
				newLetterPositions = letterPositions.map((letterPosition, index) => {
					const newLetterPosition = letterPosition;

					if (letterPosition.letter == letter) {
						newLetterPosition.wordsAmount = --letterPosition.wordsAmount;
					}
					if (letterPosition.letter >= letter) {
						newLetterPosition.position = --letterPosition.position;
					}
					return newLetterPosition;
				})
					.filter(lp => lp.wordsAmount > 0)
					.sort((a, b) => a.letter.localeCompare(b.letter));
				break;
		}



		wordsInfoDoc.commonWords.letterPositions = newLetterPositions;
		await wordsInfoDoc.save();
	}

	async find(word: string) {
		return this.wordModel.findOne({ word }).exec();
	}

	async count(): Promise<number> {
		// return this.wordModel.countDocuments({}).exec();
		this.fullUpdateWordsMap();
		return this.wordModel.estimatedDocumentCount().exec();
	}

	async findById(id: string): Promise<ICommonWord | null> {
		const foundWord = await this.wordModel.findById(id).exec();
		return foundWord;
	}

	async getPageByLetter(letter: string, limit: number): Promise<number> {
		const indexPosition = await (await this.wordModel.find({ normalizedWord: { "$lt": letter.toLowerCase() } })).length;
		const page = Math.ceil(indexPosition / limit);
		return page;
	}

	async fullUpdateWordsMap(): Promise<Map<string, number>> {
		const letterPositions = new Map<string, number>();
		const words = await this.wordModel.find({}).sort({ normalizedWord: 1 });

		if (words.length == 0) {
			return letterPositions;
		}

		let prevLetter = words[0].normalizedWord.charAt(0);
		letterPositions.set(prevLetter, 0);
		words.forEach((word, index) => {
			if (word.normalizedWord.charAt(0) !== prevLetter) {
				prevLetter = word.normalizedWord.charAt(0);
				letterPositions.set(prevLetter, index);
			}
		})

		const amount = await this.wordModel.estimatedDocumentCount().exec();

		const commonWordsLetterPositions = Array.from(letterPositions, ([letter, position]) => ({
			letter,
			position,
		}))
			// https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
			.sort((a, b) => a.letter.localeCompare(b.letter))
			.map((lp, index, array) => {
				if (index < array.length - 1) {
					return {
						letter: lp.letter,
						position: lp.position,
						wordsAmount: array[index + 1].position - array[index].position,
					}
				} else {
					return {
						letter: lp.letter,
						position: lp.position,
						wordsAmount: amount - array[index].position,
					}
				}
			});


		const wordsInfoDoc = await this.getWordsInfoDoc();
		if (!wordsInfoDoc) {
			await this.wordsInfoModel.create({
				commonWords: {
					letterPositions: commonWordsLetterPositions,
					amount,
				}
			})
			return letterPositions;
		}
		wordsInfoDoc.commonWords = { letterPositions: commonWordsLetterPositions, amount };
		await wordsInfoDoc.save();

		return letterPositions;
	}

	async update(id: string, dto: UpdateCommonWordDto): Promise<ICommonWord> {
		const updatedWord = await this.wordModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();

		return updatedWord;
	}

	async delete(id: string): Promise<ICommonWord | null> {
		const session: ClientSession = await mongoose.startSession();
		session.startTransaction();
		let deletedWord = null;
		try {
			deletedWord = await this.wordModel.findByIdAndDelete(id).exec();

			const wordsInfoDoc = (await this.wordsInfoModel.find({}))[0];
			wordsInfoDoc.commonWords.amount = wordsInfoDoc.commonWords.amount - 1;
			await wordsInfoDoc.save();

			await this.updateWordInfoLetterPositions({ letter: deletedWord.normalizedWord.charAt(0), updateMode: 'delete' });
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

