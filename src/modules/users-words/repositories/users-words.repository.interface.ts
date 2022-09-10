import { IUserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';
import mongoose from 'mongoose';

export interface IUsersWordsRepository {
    findAll: (userId: mongoose.Types.ObjectId, skip: number, limit: number | undefined) => Promise<IUserWord[]>;
    count: (userId: mongoose.Types.ObjectId) => Promise<number>;
    getPageByLetter: (userId: mongoose.Types.ObjectId, letter: string, limit: number) => Promise<number>;
    create: (userId: mongoose.Types.ObjectId, createUserWordDto: CreateUserWordDto) => Promise<IUserWord>;
    find: (userId: mongoose.Types.ObjectId, word: string) => Promise<IUserWord>;
    findById: (userId: mongoose.Types.ObjectId, wordId: string) => Promise<IUserWord | null>;
    update: (userId: mongoose.Types.ObjectId, wordId: string, dto: UpdateUserWordDto) => Promise<IUserWord>;
    delete: (userId: mongoose.Types.ObjectId, wordId: string) => Promise<IUserWord>;
}

