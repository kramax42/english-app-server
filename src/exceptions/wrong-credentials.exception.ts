import { HttpException } from './http.exception';

export class WrongCredentialsException extends HttpException {
  constructor() {
    // 401 - Unauthorized
    super(401, 'Wrong credentials provided');
  }
}
