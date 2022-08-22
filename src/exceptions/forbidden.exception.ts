import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
	constructor() {
		// 403 - Forbidden
		super(403, `Forbidden`);
	}
}
