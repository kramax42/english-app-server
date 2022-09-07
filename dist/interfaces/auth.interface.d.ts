import { Request } from 'express';
import { User } from './user.interface';
export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export interface DataStoredInToken {
    id: string;
}
export interface TokenData {
    token: string;
    expiresIn: number;
}
export interface RequestWithUser extends Request {
    user: User;
}
