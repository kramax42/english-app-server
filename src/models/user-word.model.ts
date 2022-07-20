import { UserWord, WordStudyStatus } from '@/interfaces/user-word.interface';
import mongoose from 'mongoose';
import { usageExampleSchema } from './common-word.model';

export const userWordSchema = new mongoose.Schema<UserWord>(
	{
		user: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
		word: { type: String, required: true },
		transcription: { type: String, default: 'transcription' },
		translation: { type: [String], required: true },
		usageExamples: {
			type: [usageExampleSchema],
			default: [{ sentence: '', translation: '' }],
		},
		studyStatus: {
			type: String,
			enum: Object.values(WordStudyStatus),
			default: WordStudyStatus.UNKNOWN,
		},
	},
	{ timestamps: true }
);

export const UserWordModel = mongoose.model<UserWord & mongoose.Document>(
	'UserWord',
	userWordSchema
);
