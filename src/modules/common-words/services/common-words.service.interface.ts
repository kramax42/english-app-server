import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { CommonWord, CommonWordWithUserStudyStatus } from "@/interfaces/common-word.interface";

export interface ICommonWordsService {
    create: (wordDto: CreateCommonWordDto) => Promise<CommonWord>;
    findAll: (skip: number, limit: number | undefined) => Promise<CommonWordWithUserStudyStatus[]>;
    count: () => Promise<number>;
    findById: (userId: string) => Promise<CommonWord>;
    update: (id: string, wordDto: UpdateCommonWordDto) => Promise<CommonWord>;
    delete: (id: string) => Promise<CommonWord>;
    find: (word: string) => Promise<CommonWord>;
}

