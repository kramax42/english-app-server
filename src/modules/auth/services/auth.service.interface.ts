import { LoginDto } from "@/dtos/auth.dto";
import { CreateUserDto } from "@/dtos/user.dto";
import { TokenData } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/user.interface";

export interface IAuthService {
    signUp({ email, password, name }: CreateUserDto): Promise<User>;
    logIn({ email, password }: LoginDto): Promise<{ cookie: string; foundUser: User; accessToken: string }>;
    logOut(email: string): Promise<User>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
}