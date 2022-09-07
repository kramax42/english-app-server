import { CreateUserDto } from "../../../dtos/user.dto";
import { User } from "../../../interfaces/user.interface";
import { IUsersRepository } from "./users.repository.interface";
export declare class UsersRepository implements IUsersRepository {
    private userModel;
    findAll(): Promise<User[]>;
    create({ email, name, password, }: CreateUserDto): Promise<User>;
    findById(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(userId: string, userData: CreateUserDto): Promise<User>;
    delete(userId: string): Promise<User>;
}
