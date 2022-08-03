import { UserWord } from '@interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '@dtos/user-word.dto';


export interface IUsersWordsRepository {
    findAll: (userId: string, skip: number, limit: number | undefined) => Promise<UserWord[]>;
    count: (userId: string) => Promise<number>;
    create: (
        userId: string,
        {
            word,
            translations,
            definitions,
            transcription,
            usageExamples,
            studyStatus,
        }: CreateUserWordDto
    ) => Promise<UserWord>;
    find: (userId: string, word: string) => Promise<UserWord>;
    findById: (userId: string, wordId: string) => Promise<UserWord | null>;
    update: (userId: string, wordId: string, dto: UpdateUserWordDto) => Promise<UserWord>;
    delete: (userId: string, wordId: string) => Promise<UserWord>;
}

