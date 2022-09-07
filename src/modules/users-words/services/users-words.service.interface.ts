import { IUserWord, IUserWordResponseDto } from '@/interfaces/user-word.interface';
import {
    CreateUserWordDto,
    UpdateUserWordDto,
} from '@dtos/user-word.dto';

export interface IUsersWordsService {
    create: (userId: string, wordDto: CreateUserWordDto) => Promise<IUserWord>;
    findAll: (userId: string, skip: number, limit: number | undefined) => Promise<IUserWord[]>;
    getPageByLetter: (userId: string, letter: string, limit: number) => Promise<number>;
    find: (userId: string, word: string) => Promise<IUserWord>;
    findById: (userId: string, wordId: string) => Promise<IUserWord>;
    count: (userId: string) => Promise<number>;
    update: (userId: string, wordId: string, wordDto: UpdateUserWordDto) => Promise<IUserWord>;
    delete: (userId: string, wordId: string) => Promise<IUserWord>;
    transformUserWordForResponseDTO(word: IUserWord): IUserWordResponseDto;
}

