import mongoose from 'mongoose';
import { options, optionsWithoutTimeStampsAndId } from './common/options';

export interface ILetterPosition {
    letter: string;
    position: number;
    wordsAmount: number;
}

const letterPositionSchema = new mongoose.Schema<ILetterPosition>({
    letter: { type: String, required: true },
    position: { type: Number, required: true },
    wordsAmount: { type: Number, required: true },
}, optionsWithoutTimeStampsAndId);


export interface ICommonWordsInfo {
    amount: number;
    letterPositions: ILetterPosition[];
}

const commonWordsInfoSchema = new mongoose.Schema<ICommonWordsInfo>({
    amount: { type: Number, required: true, default: 0 },
    letterPositions: { type: [letterPositionSchema], default: [] }
}, optionsWithoutTimeStampsAndId
);

export interface IWordsInfo {
    commonWords: ICommonWordsInfo;
}

export const wordsInfoSchema = new mongoose.Schema<IWordsInfo>({
    commonWords: {
        type: commonWordsInfoSchema,
        default: {
            amount: 0,
            letterPositions: []
        }
    },
}, options
);

export const WordsInfoModel = mongoose.model<IWordsInfo & mongoose.Document>(
    'WordsInfo',
    wordsInfoSchema
);
