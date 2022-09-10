import { IUserWord, IUserWordResponseDto } from '@/interfaces/user-word.interface';
import { ILetterPosition, IWordsInfo } from '@/models/words-info.model';
import {
    CreateUserWordDto,
    UpdateUserWordDto,
} from '@dtos/user-word.dto';
import mongoose from 'mongoose';


export interface IUpdateWordInfoLetterPositions {
    letter: string,
    prevLetter?: string,
    updateMode: 'create' | 'update' | 'delete',
    userId?: mongoose.Types.ObjectId;
    wordsInfoDoc: IWordsInfo;
}

export interface IWordsInfoRepository {
    updateWordInfoLetterPositions: ({
        letter,
        prevLetter,
        updateMode,
        userId,
    }: IUpdateWordInfoLetterPositions) => Promise<void>;

    getWordsInfoDoc(userId?: mongoose.Types.ObjectId): Promise<IWordsInfo>;

    fullUpdateWordsMap(userId?: mongoose.Types.ObjectId): Promise<Map<string, number>>
}

