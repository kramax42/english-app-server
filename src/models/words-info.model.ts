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


export interface IWordsInfo extends mongoose.Document{
    user: mongoose.Types.ObjectId;
    amount: number;
    letterPositions: ILetterPosition[];
}

const wordsInfoSchema = new mongoose.Schema<IWordsInfo>({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
    amount: { type: Number, required: true, default: 0 },
    letterPositions: { type: [letterPositionSchema], default: [] }
}, options
);

export const WordsInfoModel = mongoose.model<IWordsInfo & mongoose.Document>(
    'WordsInfo',
    wordsInfoSchema
);
