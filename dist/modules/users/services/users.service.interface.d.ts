import { CreateUserDto } from "../../../dtos/user.dto";
import { User } from "../../../interfaces/user.interface";
export interface IUsersService {
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User>;
    update(userId: string, userDto: CreateUserDto): Promise<User>;
    delete(userId: string): Promise<User>;
    findUser(email: string): Promise<User>;
}
