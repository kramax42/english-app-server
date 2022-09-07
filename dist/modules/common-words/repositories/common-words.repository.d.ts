import mongoose from 'mongoose';
import { ICommonWord, ICommonWordWithUserWordResponseDto } from '../../../interfaces/common-word.interface';
import { CreateCommonWordDto, UpdateCommonWordDto } from '../../../dtos/common-word.dto';
import { ICommonWordsRepository } from './common-words.repository.interface';
export declare class CommonWordsRepository implements ICommonWordsRepository {
    private wordModel;
    findAll(skip: number, limit: number | null, userId?: string): Promise<ICommonWordWithUserWordResponseDto[]>;
    create(createCommonWordDto: CreateCommonWordDto): Promise<ICommonWord>;
    find(word: string): Promise<ICommonWord & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    count(): Promise<number>;
    findById(id: string): Promise<ICommonWord | null>;
    update(id: string, dto: UpdateCommonWordDto): Promise<ICommonWord>;
    delete(id: string): Promise<ICommonWord>;
}
