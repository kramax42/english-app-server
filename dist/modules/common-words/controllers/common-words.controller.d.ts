import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../../interfaces/auth.interface';
import { ICommonWordsService } from '../services/common-words.service.interface';
import { IController } from '../../../interfaces/contoller.interface';
export declare class CommonWordsController implements IController {
    private readonly commonWordsService;
    path: string;
    router: import("express-serve-static-core").Router;
    constructor(commonWordsService: ICommonWordsService);
    initializeRoutes(): void;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findAll: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    count: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
