/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUserWord } from '../../../interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '../../../dtos/user-word.dto';
import { IUsersWordsRepository } from './users-words.repository.interface';
export declare class UsersWordsRepository implements IUsersWordsRepository {
    private wordModel;
    findAll(userId: string, skip: number, limit: number | undefined): Promise<IUserWord[]>;
    count(userId: string): Promise<number>;
    create(userId: string, createUserWordDto: CreateUserWordDto): Promise<IUserWord>;
    find(userId: string, word: string): Promise<IUserWord & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(userId: string, wordId: string): Promise<IUserWord | null>;
    update(userId: string, wordId: string, updateUserWordDto: UpdateUserWordDto): Promise<IUserWord>;
    delete(userId: string, wordId: string): Promise<IUserWord>;
}
