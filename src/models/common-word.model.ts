import mongoose from 'mongoose';
import { CommonWord, UsageExample } from '@interfaces/common-word.interface';
import { options } from './common/options';

export const usageExampleSchema = new mongoose.Schema<UsageExample>({
	sentence: String,
	translation: String,
}, options);

export const commonWordSchema = new mongoose.Schema<CommonWord>({
	word: { type: String, required: true },
	transcription: { type: String, default: undefined },
	translations: { type: [String], required: true, default: undefined },
	definitions: { type: [String], required: true, default: undefined },
	usageExamples: { type: [usageExampleSchema], default: undefined },
}, options
);

export const CommonWordModel = mongoose.model<CommonWord & mongoose.Document>(
	'CommonWord',
	commonWordSchema
);
