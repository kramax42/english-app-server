import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { Controller } from '@interfaces/contoller.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class AuthController implements Controller {

  public path = '/';
  public router = Router();
  public authService = new AuthService();


  constructor() {
    this.initializeRoutes();
  }


  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.logOut);
    this.router.get(`${this.path}me`, authMiddleware, this.me);
  }


  private signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };


  private logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };


  private logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };


  private me = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: User = req.user;
  
      res.status(200).json({ data: user, message: 'me' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
