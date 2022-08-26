import mongoose from 'mongoose';
import { CommonWord, Transcription, UsageExample } from '@interfaces/common-word.interface';
import { options } from './common/options';

export const usageExampleSchema = new mongoose.Schema<UsageExample>({
	sentence: String,
	translation: String,
}, options);

export const transcriptionSchema = new mongoose.Schema<Transcription>({
	uk: String,
	us: String,
}, options);

export const commonWordSchema = new mongoose.Schema<CommonWord>({
	word: { type: String, required: true },
	transcription: { type: transcriptionSchema, default: null },
	translations: { type: [String], required: true, default: [] },
	definitions: { type: [String], required: true, default: [] },
	usageExamples: { type: [usageExampleSchema], default: [] },
}, options
);

export const CommonWordModel = mongoose.model<CommonWord & mongoose.Document>(
	'CommonWord',
	commonWordSchema
);
