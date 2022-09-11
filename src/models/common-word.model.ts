import mongoose from 'mongoose';
import { ICommonWord, IMeaning, ITranscription, PartOfSpeech, WordLevel } from '@interfaces/common-word.interface';
import { options } from './common/options';

export const transcriptionSchema = new mongoose.Schema<ITranscription>({
	uk: { type: String, default: null },
	us: { type: String, default: null },
}, options);

export const meaningSchema = new mongoose.Schema<IMeaning>({
	definition: { type: String, default: null },
	translations: { type: [String], default: [] },
	usageExamples: { type: [String], default: [] },
	synonyms: { type: [String], default: [] },
	antonyms: { type: [String], default: [] },
	pos: {
		type: String,
		enum: Object.values(PartOfSpeech),
		default: null,
	},
	level: {
		type: String,
		enum: Object.values(WordLevel),
		default: WordLevel.Uncategorized,
	},
}, options);

export const commonWordSchema = new mongoose.Schema<ICommonWord>({
	word: { type: String, required: true },
	normalizedWord: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: { uk: null, us: null } },
	meanings: { type: [meaningSchema] },
}, options
);

commonWordSchema.index({ normalizedWord: 1 }, { unique: true });

export const CommonWordModel = mongoose.model<ICommonWord & mongoose.Document>(
	'CommonWord',
	commonWordSchema
);
