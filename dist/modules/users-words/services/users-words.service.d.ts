import { IUserWord, IUserWordResponseDto } from '../../../interfaces/user-word.interface';
import { CreateUserWordDto, UpdateUserWordDto } from '../../../dtos/user-word.dto';
import { IUsersWordsService } from './users-words.service.interface';
import { IUsersWordsRepository } from '../repositories/users-words.repository.interface';
export declare class UsersWordsService implements IUsersWordsService {
    private readonly usersWordsRepository;
    constructor(usersWordsRepository: IUsersWordsRepository);
    create(userId: string, createUserWordDto: CreateUserWordDto): Promise<IUserWord>;
    findAll(userId: string, skip: number, limit: number | undefined): Promise<IUserWord[]>;
    count(userId: string): Promise<number>;
    findById(userId: string, wordId: string): Promise<IUserWord>;
    update(userId: string, wordId: string, updateUserWordDto: UpdateUserWordDto): Promise<IUserWord>;
    delete(userId: string, wordId: string): Promise<IUserWord>;
    find(userId: string, word: string): Promise<IUserWord>;
    transformUserWordForResponseDTO(word: IUserWord): IUserWordResponseDto;
}
