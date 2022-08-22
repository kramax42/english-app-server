import { HttpException } from './http.exception';

export class UserNotFoundException extends HttpException {
	constructor() {
		// 400 - Bad Request
		super(400, 'This user does not exist');
	}
}

