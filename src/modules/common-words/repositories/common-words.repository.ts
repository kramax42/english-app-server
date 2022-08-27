// import * as mongoose from 'mongoose';
// var mongoose = require('mongoose');
import { Types } from 'mongoose';
import { CommonWordModel } from '@models/common-word.model';
import { CommonWord, CommonWordWithUserWordResponseDTO } from '@interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { UserWordModel } from '@/models/user-word.model';
import { ICommonWordsRepository } from './common-words.repository.interface';

export class CommonWordsRepository implements ICommonWordsRepository {
	private userWordModel = UserWordModel;
	private wordModel = CommonWordModel;

	async findAll(
		skip: number,
		limit: number | null,
		userId?: string
	): Promise<CommonWordWithUserWordResponseDTO[]> {

		console.log(new Types.ObjectId(userId));
		const aggregate = this.wordModel.aggregate([
			{ $sort: { _id: 1 } },
			{ $skip: skip },
			{ $limit: limit || 5 },
			{
				//https://stackoverflow.com/questions/51010754/add-only-a-field-from-another-collection-in-mongodb
				$lookup: {
					from: "userwords",
					let: { thisSessionUserId: new Types.ObjectId(userId), commonWord: '$word' },
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
					"usageExamples._id": 0,
					"userWord._id": 0,
					"userWord.__v": 0,
					"userWord.user": 0,
				}
			}
		]);

		// for (const word of words) {
		// 	const userWord = await this.userWordModel.findOne({ commonWord: word._id });
		// 	results.push({
		// 		commonWord: word,
		// 		userStudyStatus: userWord ? userWord.studyStatus : WordStudyStatus.UNKNOWN
		// 	});
		// }

		// return Promise.all(results);

		const results: CommonWordWithUserWordResponseDTO[] = await aggregate.exec();
		console.log(results);
		return results;
	}

	async create(createCommonWordDto: CreateCommonWordDto): Promise<CommonWord> {
		const createdWord = await this.wordModel.create(createCommonWordDto);
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

