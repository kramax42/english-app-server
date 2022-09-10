import { UserWordModel } from '@models/user-word.model';
import { IUserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';
import { IUsersWordsRepository } from './users-words.repository.interface';
import mongoose, { ClientSession } from 'mongoose';
import { IWordsInfoRepository } from '@/modules/words-info/repositories/words-info.repository.interface';
import { IWordsInfo } from '@/models/words-info.model';

export class UsersWordsRepository implements IUsersWordsRepository {
	private wordModel = UserWordModel;

	constructor(private readonly wordsInfoRepository: IWordsInfoRepository) { }

	public async findAll(userId: mongoose.Types.ObjectId, skip: number = 0,
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

	async count(userId: mongoose.Types.ObjectId): Promise<number> {

		// return (await this.wordModel.find({ user: userId }).exec()).length;
		return this.wordModel.countDocuments({ user: userId });
	}

	public async create(userId: mongoose.Types.ObjectId, createUserWordDto: CreateUserWordDto): Promise<IUserWord> {

		const session: ClientSession = await mongoose.startSession();

		session.startTransaction();
		let createdWord = null;
		try {
			createdWord = await this.wordModel.create({
				user: userId,
				...createUserWordDto,
			});

			let wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc(userId);

			if (wordsInfoDoc) {
				await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter: createdWord.normalizedWord.charAt(0), updateMode: 'create', userId, wordsInfoDoc });
				wordsInfoDoc.amount = wordsInfoDoc.amount + 1;
				await wordsInfoDoc.save();
			} else {
				await this.wordsInfoRepository.fullUpdateWordsMap(userId);

			}
			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
			return createdWord;
		}
	}

	async find(userId: mongoose.Types.ObjectId, word: string) {
		return this.wordModel.findOne({ word, user: userId }).exec();
	}

	async findById(userId: mongoose.Types.ObjectId, wordId: string): Promise<IUserWord | null> {
		const foundWord = await this.wordModel
			.findOne({ user: userId, _id: wordId })
			.exec();
		return foundWord;
	}

	async getPageByLetter(userId: mongoose.Types.ObjectId, letter: string, limit: number): Promise<number> {
		const indexPosition = await (await this.wordModel.find({ user: userId, normalizedWord: { "$lt": letter.toLowerCase() } })).length;
		const page = Math.ceil(indexPosition / limit);
		return page;
	}

	async update(
		userId: mongoose.Types.ObjectId,
		wordId: string,
		updateUserWordDto: UpdateUserWordDto
	): Promise<IUserWord> {
		const session: ClientSession = await mongoose.startSession();

		session.startTransaction();
		const existedWord = await this.wordModel.findById(wordId)
		const updatedWord = await this.wordModel.findByIdAndUpdate(wordId, updateUserWordDto, { new: true })
		try {
			const prevLetter = existedWord.normalizedWord.charAt(0);
			const letter = updatedWord.normalizedWord.charAt(0);
			if (letter !== prevLetter) {
				const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc(userId);
				await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter, prevLetter, updateMode: 'update', wordsInfoDoc, userId });
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

	async delete(userId: mongoose.Types.ObjectId, wordId: string): Promise<IUserWord> {
		// const deletedWord = await this.wordModel
		// 	.findOneAndDelete({ _id: wordId, user: userId })
		// 	.exec();
		// return deletedWord;

		const session: ClientSession = await mongoose.startSession();
		session.startTransaction();
		let deletedWord = null;
		try {
			deletedWord = await this.wordModel.findByIdAndDelete(wordId).exec();

			const wordsInfoDoc = await this.wordsInfoRepository.getWordsInfoDoc(userId);
			wordsInfoDoc.amount = wordsInfoDoc.amount - 1;
			await wordsInfoDoc.save();

			await this.wordsInfoRepository.updateWordInfoLetterPositions({ letter: deletedWord.normalizedWord.charAt(0), updateMode: 'delete', wordsInfoDoc, userId });
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

