import { CreateUserDto } from '../../../dtos/user.dto';
import { TokenData } from '../../../interfaces/auth.interface';
import { User, UserResponseDTO } from '../../../interfaces/user.interface';
import { LoginDto } from '../../../dtos/auth.dto';
import { IAuthService } from './auth.service.interface';
import { IUsersRepository } from '../../../modules/users/repositories/users.repository.interface';
export declare class AuthService implements IAuthService {
    private readonly usersRepository;
    constructor(usersRepository: IUsersRepository);
    signUp({ email, password, name }: CreateUserDto): Promise<User>;
    signIn({ email, password, }: LoginDto): Promise<{
        cookie: string;
        foundUser: User;
        accessToken: string;
    }>;
    logOut(email: string): Promise<User>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
    transformUserForResponseDTO(user: User): UserResponseDTO;
}
