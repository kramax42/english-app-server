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
    userId?: string;
    wordsInfoDoc: IWordsInfo;
}

export interface IWordsInfoRepository {
    updateWordInfoLetterPositions: ({
        letter,
        prevLetter,
        updateMode,
        userId,
    }: IUpdateWordInfoLetterPositions) => Promise<void>;

    getWordsInfoDoc(userId?: string): Promise<IWordsInfo>;

    getActiveLetters(userId?: string): Promise<string[]>;

    fullUpdateWordsMap(userId?: string): Promise<Map<string, number>>
}

