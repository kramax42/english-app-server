import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/http.exception';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/user.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const foundedUser = await UserModel.findById(userId)


      if (foundedUser) {
        req.user = foundedUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
