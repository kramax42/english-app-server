import { NextFunction, Request, Response } from 'express';
import { ISystemStatusController } from './system-status.controller.interface';
import { ISystemStatusService } from '../services/system-status.service.interface';
export declare class SystemStatusController implements ISystemStatusController {
    private readonly systemStatusService;
    path: string;
    router: import("express-serve-static-core").Router;
    constructor(systemStatusService: ISystemStatusService);
    initializeRoutes(): void;
    getOk: (req: Request, res: Response, next: NextFunction) => void;
    getSystemInfo: (req: Request, res: Response, next: NextFunction) => void;
    getServerTime: (req: Request, res: Response, next: NextFunction) => void;
    getResourceUsage: (req: Request, res: Response, next: NextFunction) => void;
    getProcessInfo: (req: Request, res: Response, next: NextFunction) => void;
}
