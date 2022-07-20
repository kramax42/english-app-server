import { Request } from 'express';
import { User } from '@interfaces/user.interface';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
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
