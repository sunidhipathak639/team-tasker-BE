import jwt, { SignOptions } from 'jsonwebtoken';
import { isPlainObject } from 'lodash';
import { InvalidTokenError } from 'errors';

export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '180 days',
    ...options,
  });

export const verifyToken = (token?: string): { sub: string; [key: string]: any } | null => {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (isPlainObject(payload)) return payload as { sub: string };
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};

