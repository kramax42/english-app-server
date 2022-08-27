import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { CommonWord, CommonWordWithUserStudyStatusResponseDTO } from "@/interfaces/common-word.interface";

export interface ICommonWordsService {
    create: (wordDto: CreateCommonWordDto) => Promise<CommonWord>;
    findAll: (skip: number, limit: number | null, userId?: string) => Promise<CommonWordWithUserStudyStatusResponseDTO[]>;
    count: () => Promise<number>;
    findById: (userId: string) => Promise<CommonWord>;
    update: (id: string, wordDto: UpdateCommonWordDto) => Promise<CommonWord>;
    delete: (id: string) => Promise<CommonWord>;
    find: (word: string) => Promise<CommonWord>;
}

