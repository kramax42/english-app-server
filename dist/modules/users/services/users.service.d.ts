import { CreateUserDto } from '../../../dtos/user.dto';
import { User } from '../../../interfaces/user.interface';
import { IUsersRepository } from '../repositories/users.repository.interface';
import { IUsersService } from './users.service.interface';
export declare class UsersService implements IUsersService {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User>;
    update(userId: string, userDto: CreateUserDto): Promise<User>;
    delete(userId: string): Promise<User>;
    findUser(email: string): Promise<User>;
}
