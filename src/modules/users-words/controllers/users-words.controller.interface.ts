import { RequestWithUser } from '@/interfaces/auth.interface';
import { IController } from '@/interfaces/contoller.interface';
import { NextFunction, Response } from 'express';

export interface IUserWordsController extends IController {
    create: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    findAll: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    count: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    update: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}

