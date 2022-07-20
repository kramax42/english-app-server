
import { ForbiddenException } from '@/exceptions/forbidden.exception';
import { RequestWithUser, Role } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

export const permitTo =
  (...allowedRoles: Role[]) =>
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    console.log(allowedRoles);
    console.log(user.role);
    console.log(allowedRoles.includes(user.role));
    if (!allowedRoles.includes(user.role)) {
      return next(
        new ForbiddenException()
      );
    }

    next();
  };