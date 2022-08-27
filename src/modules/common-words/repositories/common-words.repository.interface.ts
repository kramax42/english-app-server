import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { CommonWord, CommonWordWithUserWordResponseDto } from "@/interfaces/common-word.interface";

export interface ICommonWordsRepository {
    findAll: (skip: number, limit: number | null, userId?: string) => Promise<CommonWordWithUserWordResponseDto[]>;
    create: (createCommonWordDto: CreateCommonWordDto) => Promise<CommonWord>;
    find: (word: string) => Promise<CommonWord>;
    count(): Promise<number>;
    findById: (id: string) => Promise<CommonWord | null>;
    update: (id: string, dto: UpdateCommonWordDto) => Promise<CommonWord>;
    delete: (id: string) => Promise<CommonWord>;
}

