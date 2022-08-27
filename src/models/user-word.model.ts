import mongoose from 'mongoose';
import { UserWord, WordStudyStatus } from '@interfaces/user-word.interface';
import { transcriptionSchema, usageExampleSchema } from './common-word.model';
import { options } from './common/options';
import { WordLevel } from '@/interfaces/common-word.interface';

export const userWordSchema = new mongoose.Schema<UserWord>({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
	},
	word: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: { uk: null, us: null } },
	definitions: { type: [String], default: [] },
	translations: { type: [String], default: [] },
	synonyms: { type: [String], default: [] },
	antonyms: { type: [String], default: [] },
	usageExamples: { type: [usageExampleSchema], default: [] },
	studyStatus: {
		type: String,
		enum: Object.values(WordStudyStatus),
		default: WordStudyStatus.LEARN,
	},
	level: {
		type: String,
		enum: Object.values(WordLevel),
		default: WordLevel.UNCATEGORIZED,
	},
}, options
);


export const UserWordModel = mongoose.model<UserWord & mongoose.Document>(
	'UserWord',
	userWordSchema
);
