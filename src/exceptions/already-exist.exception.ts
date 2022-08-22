import { HttpException } from './http.exception';

export class AlreadyExistsException extends HttpException {
	constructor() {
		// 409 - Conflict
		super(409, `Already exists`);
	}
}
