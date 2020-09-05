import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const serverError = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const status = err.status || 500;
  return res
    .status(status)
    .json({ message: err.message || 'Internal Server Error', status });
};
