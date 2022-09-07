import { ICommonWord, ICommonWordResponseDto, ICommonWordWithUserWordResponseDto } from '../../../interfaces/common-word.interface';
import { CreateCommonWordDto, UpdateCommonWordDto } from '../../../dtos/common-word.dto';
import { ICommonWordsService } from './common-words.service.interface';
import { ICommonWordsRepository } from '../repositories/common-words.repository.interface';
export declare class CommonWordsService implements ICommonWordsService {
    private readonly commonWordsRepository;
    constructor(commonWordsRepository: ICommonWordsRepository);
    create(wordDto: CreateCommonWordDto): Promise<ICommonWord>;
    findAll(skip: number, limit: number | null, userId?: string): Promise<ICommonWordWithUserWordResponseDto[]>;
    count(): Promise<number>;
    findById(userId: string): Promise<ICommonWord>;
    update(id: string, wordDto: UpdateCommonWordDto): Promise<ICommonWord>;
    delete(id: string): Promise<ICommonWord>;
    find(word: string): Promise<ICommonWord>;
    transformCommonWordForResponseDto(word: ICommonWord): ICommonWordResponseDto;
}
