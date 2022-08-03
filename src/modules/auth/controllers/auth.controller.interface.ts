import { RequestWithUser } from '@/interfaces/auth.interface';
import { IController } from '@/interfaces/contoller.interface';
import { NextFunction, Request, Response } from 'express';

export interface IAuthController extends IController {
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOut: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    me: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}