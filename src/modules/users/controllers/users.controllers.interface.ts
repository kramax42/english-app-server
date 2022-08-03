import { RequestWithUser } from "@/interfaces/auth.interface";
import { IController } from "@/interfaces/contoller.interface";
import { Request, Response, NextFunction } from "express";

export interface IUsersController extends IController {
    findAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}