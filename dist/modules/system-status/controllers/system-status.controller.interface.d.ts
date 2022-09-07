import { IController } from "../../../interfaces/contoller.interface";
import { Request, Response, NextFunction } from "express";
export interface ISystemStatusController extends IController {
    getOk: (req: Request, res: Response, next: NextFunction) => void;
    getSystemInfo: (req: Request, res: Response, next: NextFunction) => void;
    getServerTime: (req: Request, res: Response, next: NextFunction) => void;
    getResourceUsage: (req: Request, res: Response, next: NextFunction) => void;
    getProcessInfo: (req: Request, res: Response, next: NextFunction) => void;
}
