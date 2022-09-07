import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../../interfaces/auth.interface';
import { IUsersWordsService } from '../services/users-words.service.interface';
import { IController } from '../../../interfaces/contoller.interface';
export declare class UsersWordsController implements IController {
    private readonly usersWordsService;
    path: string;
    router: import("express-serve-static-core").Router;
    constructor(usersWordsService: IUsersWordsService);
    initializeRoutes(): void;
    create: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    findAll: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    count: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    update: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
