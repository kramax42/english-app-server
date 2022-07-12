import { HttpException } from './http.exception';

export class WordNotFoundException extends HttpException {
	constructor() {
    // 400 - Bad Request
		super(400, 'This word does not exist');
	}
}

