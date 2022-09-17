import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { ICommonWord, ICommonWordResponseDto, ICommonWordWithUserWordResponseDto } from "@/interfaces/common-word.interface";

export interface ICommonWordsService {
    create: (wordDto: CreateCommonWordDto) => Promise<ICommonWord>;
    findAll: (skip: number, limit: number | null, userId?: string) => Promise<ICommonWordWithUserWordResponseDto[]>;
    getActiveLetters: () => Promise<string[]>;
    getPageByLetter: (letter: string, limit: number) => Promise<number>;
    count: () => Promise<number>;
    findById: (userId: string) => Promise<ICommonWord>;
    update: (id: string, wordDto: UpdateCommonWordDto) => Promise<ICommonWord>;
    delete: (id: string) => Promise<ICommonWord>;
    find: (word: string) => Promise<ICommonWord>;
    transformCommonWordForResponseDto(word: ICommonWord): ICommonWordResponseDto;
}

