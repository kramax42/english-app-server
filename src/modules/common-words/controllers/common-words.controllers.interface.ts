import { RequestWithUser } from "@/interfaces/auth.interface";
import { IController } from "@/interfaces/contoller.interface";
import { Request, Response, NextFunction } from "express";

export interface ICommonWordsController extends IController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    count: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}