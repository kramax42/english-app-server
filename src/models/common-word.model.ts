import mongoose from 'mongoose';
import { ICommonWord, IMeaning, ITranscription, IUsageExample, WordLevel } from '@interfaces/common-word.interface';
import { options } from './common/options';

export const usageExampleSchema = new mongoose.Schema<IUsageExample>({
	sentence: { type: String, default: null },
	translation: { type: String, default: null },
}, options);

export const transcriptionSchema = new mongoose.Schema<ITranscription>({
	uk: { type: String, default: null },
	us: { type: String, default: null },
}, options);

export const meaningSchema = new mongoose.Schema<IMeaning>({
	pos: { type: String, default: null },
	translations: { type: [String], required: true, default: [] },
	definitions: { type: [String], required: true, default: [] },
	usageExamples: { type: [usageExampleSchema], default: [] },
	synonyms: { type: [String], default: [] },
	antonyms: { type: [String], default: [] },
	level: {
		type: String,
		enum: Object.values(WordLevel),
		default: WordLevel.UNCATEGORIZED,
	},
}, options);

export const commonWordSchema = new mongoose.Schema<ICommonWord>({
	word: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: { uk: null, us: null } },
	meanings: { type: [meaningSchema] },
}, options
);

commonWordSchema.index({ word: 1 }, { unique: true });

export const CommonWordModel = mongoose.model<ICommonWord & mongoose.Document>(
	'CommonWord',
	commonWordSchema
);
