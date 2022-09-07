/// <reference types="qs" />
import { ClassConstructor } from 'class-transformer';
import type { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            validatedParams: Record<string, any>;
            validatedQuery: Record<string, any>;
            validatedBody: any;
        }
    }
}
export interface IClassMiddlewareOptions {
    whitelist: boolean;
    implicitConversion: boolean;
    passOnError: boolean;
}
export declare function paramValidator<T extends object>(dtoClass: ClassConstructor<T>, options?: Partial<IClassMiddlewareOptions>): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare function queryValidator<T extends object>(dtoClass: ClassConstructor<T>, options?: Partial<IClassMiddlewareOptions>): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export declare function bodyValidator<T extends object>(dtoClass: ClassConstructor<T>, options?: Partial<IClassMiddlewareOptions>): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
