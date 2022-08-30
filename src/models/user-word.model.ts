import mongoose from 'mongoose';
import { IUserWord, WordStudyStatus } from '@interfaces/user-word.interface';
import { meaningSchema, transcriptionSchema } from './common-word.model';
import { options } from './common/options';

export const userWordSchema = new mongoose.Schema<IUserWord>({
	user: {
		ref: 'User',
		type: mongoose.Schema.Types.ObjectId,
	},
	word: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: { uk: null, us: null } },
	meanings: { type: [meaningSchema] },
	studyStatus: {
		type: String,
		enum: Object.values(WordStudyStatus),
		default: WordStudyStatus.Learn,
	},
}, options
);

userWordSchema.index({ word: 1 });
userWordSchema.index({ user: 1 });
userWordSchema.index({ word: 1, user: 1 }, { unique: true });

export const UserWordModel = mongoose.model<IUserWord & mongoose.Document>(
	'UserWord',
	userWordSchema
);
