import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import config from 'config';
import { HttpException } from '@exceptions/http.exception';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/user.model';

export const authMiddleware = (throwError: boolean = true) => async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization = req.cookies['Authorization'].split('Bearer ')[1] || req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const foundedUser = await UserModel.findById(userId)

      if (foundedUser) {
        req.user = foundedUser;
        next();
      } else {
        if (throwError) {
          next(new HttpException(401, 'Wrong authentication token'));
        } else {
          next();
        }

      }
    } else {
      if (throwError) {
        next(new HttpException(404, 'Authentication token missing'));
      } else {
        next();
      }
    }
  } catch (error) {
    if (throwError) {
      next(new HttpException(401, 'Wrong authentication token'));
    } else {
      next();
    }
  }
};
