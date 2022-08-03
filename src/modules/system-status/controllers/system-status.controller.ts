import { NextFunction, Request, Response, Router } from 'express';
import { ISystemStatusController } from './system-status.controller.interface';
import { ISystemStatusService } from '../services/system-status.service.interface';

export class SystemStatusController implements ISystemStatusController {
	public path = '';
	public router = Router();

	constructor(private readonly systemStatusService: ISystemStatusService) {
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get(this.path + '/', this.getOk);
		this.router.get(this.path + '/system', this.getSystemInfo);
		this.router.get(this.path + '/time', this.getServerTime);
		this.router.get(this.path + '/usage', this.getResourceUsage);
		this.router.get(this.path + '/process', this.getProcessInfo);
	}

	getOk = (req: Request, res: Response, next: NextFunction): void => {
		try {
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	getSystemInfo = (req: Request, res: Response, next: NextFunction): void => {
		try {
			const response = this.systemStatusService.getSystemInfo();
			res.send(response);
		} catch (err) {
			next(err);
		}
	}

	getServerTime = (req: Request, res: Response, next: NextFunction): void => {
		try {
			const response = this.systemStatusService.getServerTime();
			res.send(response);
		} catch (err) {
			next(err);
		}
	}

	getResourceUsage = (req: Request, res: Response, next: NextFunction): void => {
		try {
			const response = this.systemStatusService.getResourceUsage();
			res.send(response);
		} catch (err) {
			next(err);
		}
	}

	getProcessInfo = (req: Request, res: Response, next: NextFunction): void => {
		try {
			const response = this.systemStatusService.getProcessInfo();
			res.send(response);
		} catch (err) {
			next(err);
		}
	}
}

