import { CommonWord, UsageExample } from '@interfaces/common-word.interface';
import mongoose from 'mongoose';

export const usageExampleSchema = new mongoose.Schema<UsageExample>({
	sentence: String,
	translation: String,
});

export const commonWordSchema = new mongoose.Schema<CommonWord>(
	{
		word: { type: String, required: true },
		transcription: { type: String, default: 'transcription' },
		translation: { type: [String], required: true },
		usageExamples: {
			type: [usageExampleSchema],
			default: [{ sentence: '', translation: '' }],
		},
	},
	{ timestamps: true }
);

export const CommonWordModel = mongoose.model<CommonWord & mongoose.Document>(
	'CommonWord',
	commonWordSchema
);
