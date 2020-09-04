import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

// we will add other jwt utility functions in this file like blacklisting tokens etc,
// then we can remove the below line
// eslint-disable-next-line import/prefer-default-export
export const generateToken = (
  payload: string | Buffer | object,
  options?: SignOptions
) => {
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
