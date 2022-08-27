import mongoose from 'mongoose';
import { UserWord, WordStudyStatus } from '@interfaces/user-word.interface';
import { transcriptionSchema, usageExampleSchema } from './common-word.model';
import { options } from './common/options';

export const userWordSchema = new mongoose.Schema<UserWord>({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
	},
	word: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: null },
	definitions: { type: [String], default: [] },
	translations: { type: [String], default: [] },
	usageExamples: { type: [usageExampleSchema], default: [] },
	studyStatus: {
		type: String,
		enum: Object.values(WordStudyStatus),
		default: WordStudyStatus.LEARN,
	},
}, options
);


export const UserWordModel = mongoose.model<UserWord & mongoose.Document>(
	'UserWord',
	userWordSchema
);
