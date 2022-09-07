import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../../interfaces/auth.interface';
import { IAuthService } from '../services/auth.service.interface';
import { IController } from '../../../interfaces/contoller.interface';
export declare class AuthController implements IController {
    private readonly authService;
    path: string;
    router: import("express-serve-static-core").Router;
    constructor(authService: IAuthService);
    initializeRoutes(): void;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOut: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    me: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
