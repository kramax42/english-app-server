import { CreateUserDto } from "../../../dtos/user.dto";
import { User } from "../../../interfaces/user.interface";
export interface IUsersRepository {
    create({ email, name, password }: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(userId: string, userData: CreateUserDto): Promise<User>;
    delete(userId: string): Promise<User>;
}
