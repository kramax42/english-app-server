import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
export declare const authMiddleware: (throwError?: boolean) => (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
