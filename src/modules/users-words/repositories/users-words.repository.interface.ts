import { IUserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';

export interface IUsersWordsRepository {
    findAll: (userId: string, skip: number, limit: number | undefined) => Promise<IUserWord[]>;
    count: (userId: string) => Promise<number>;
    getPageByLetter: (userId: string, letter: string, limit: number) => Promise<number>;
    create: (userId: string, createUserWordDto: CreateUserWordDto) => Promise<IUserWord>;
    find: (userId: string, word: string) => Promise<IUserWord>;
    findById: (userId: string, wordId: string) => Promise<IUserWord | null>;
    update: (userId: string, wordId: string, dto: UpdateUserWordDto) => Promise<IUserWord>;
    delete: (userId: string, wordId: string) => Promise<IUserWord>;
}

