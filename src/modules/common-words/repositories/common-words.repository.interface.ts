import { CreateCommonWordDto, UpdateCommonWordDto } from "@/dtos/common-word.dto";
import { CommonWord, CommonWordWithUserStudyStatus } from "@/interfaces/common-word.interface";

export interface ICommonWordsRepository {
    findAll: (skip: number, limit: number | undefined) => Promise<CommonWordWithUserStudyStatus[]>;
    create: ({
        word,
        translations,
        definitions,
        transcription,
        usageExamples,
    }: CreateCommonWordDto) => Promise<CommonWord>;
    find: (word: string) => Promise<CommonWord>;
    count(): Promise<number>;
    findById: (id: string) => Promise<CommonWord | null>;
    update: (id: string, dto: UpdateCommonWordDto) => Promise<CommonWord>;
    delete: (id: string) => Promise<CommonWord>;
}

