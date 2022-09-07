import { RequestWithUser, Role } from '../interfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare const permitTo: (...allowedRoles: Role[]) => (req: RequestWithUser, res: Response, next: NextFunction) => void;
