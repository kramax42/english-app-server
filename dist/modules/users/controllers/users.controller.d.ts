import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../../interfaces/auth.interface';
import { IUsersService } from '../services/users.service.interface';
import { IController } from '../../../interfaces/contoller.interface';
export declare class UsersController implements IController {
    private readonly usersService;
    path: string;
    router: import("express-serve-static-core").Router;
    constructor(usersService: IUsersService);
    initializeRoutes(): void;
    findAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
