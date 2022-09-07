import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { ICommonWord, ICommonWordWithUserWordResponseDto } from "@/interfaces/common-word.interface";

export interface ICommonWordsRepository {
    findAll: (skip: number, limit: number | null, userId?: string) => Promise<ICommonWordWithUserWordResponseDto[]>;
    create: (createCommonWordDto: CreateCommonWordDto) => Promise<ICommonWord>;
    find: (word: string) => Promise<ICommonWord>;
    count(): Promise<number>;
    findById: (id: string) => Promise<ICommonWord | null>;
    getPageByLetter: (letter: string, limit: number) => Promise<number>;
    update: (id: string, dto: UpdateCommonWordDto) => Promise<ICommonWord>;
    delete: (id: string) => Promise<ICommonWord>;
}

