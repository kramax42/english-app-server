import { UserWord } from '@/interfaces/user-word.interface';
import {
    CreateUserWordDto,
    UpdateUserWordDto,
} from '@dtos/user-word.dto';

export interface IUsersWordsService {
    create: (userId: string, wordDto: CreateUserWordDto) => Promise<UserWord>;
    findAll: (userId: string, skip: number, limit: number | undefined) => Promise<UserWord[]>;
    find: (userId: string, word: string) => Promise<UserWord>;
    findById: (userId: string, wordId: string) => Promise<UserWord>;
    count: (userId: string) => Promise<number>;
    update: (userId: string, wordId: string, wordDto: UpdateUserWordDto) => Promise<UserWord>;
    delete: (userId: string, wordId: string) => Promise<UserWord>;
}

