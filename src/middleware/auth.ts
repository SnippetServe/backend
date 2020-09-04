import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../errors/httpErrors';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next(new Unauthorized('You must be logged in'));
  }

  return next();
};
