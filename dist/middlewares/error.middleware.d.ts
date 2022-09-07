import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';
export declare const errorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
