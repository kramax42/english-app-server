/// <reference types="node" />
import 'dotenv/config';
import { Server } from 'http';
import express from 'express';
import { IController } from './interfaces/contoller.interface';
declare class App {
    app: express.Application;
    port: string | number;
    env: string;
    server: Server;
    constructor(controllers: IController[]);
    listen(): void;
    getServer(): express.Application;
    private connectToTheDatabase;
    private initializeMiddlewares;
    private initializeContollers;
    private initializeSwagger;
    private initializeErrorHandling;
}
export default App;
