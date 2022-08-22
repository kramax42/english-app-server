import mongoose from 'mongoose';
import { UserWord, WordStudyStatus } from '@interfaces/user-word.interface';
import { usageExampleSchema } from './common-word.model';
import { options } from './common/options';

export const userWordSchema = new mongoose.Schema<UserWord>({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
	},
	commonWord: {
		ref: 'CommonWord',
		type: mongoose.Schema.Types.ObjectId,
	},
	word: { type: String, required: true },
	transcription: { type: String, default: undefined },
	definitions: { type: [String], default: undefined },
	translations: { type: [String], default: undefined },
	usageExamples: { type: [usageExampleSchema], default: undefined },
	studyStatus: {
		type: String,
		enum: Object.values(WordStudyStatus),
		default: WordStudyStatus.UNKNOWN,
	},
}, options
);


export const UserWordModel = mongoose.model<UserWord & mongoose.Document>(
	'UserWord',
	userWordSchema
);
