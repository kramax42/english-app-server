import { Controller } from '@/interfaces/contoller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class IndexController implements Controller {
	public path = '/';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.getOk);
	}

	public getOk = (req: Request, res: Response, next: NextFunction): void => {
		try {
			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	};
}

export default IndexController;
