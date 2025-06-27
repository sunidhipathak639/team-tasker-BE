import jwt, { SignOptions } from 'jsonwebtoken';
import { isPlainObject } from 'lodash';
import { InvalidTokenError } from 'errors';

// Ensure JWT_SECRET is defined in the environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment');
}

export const signToken = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '180d', // Consider adjusting expiration as per your needs
    ...options,
  });
};

export const verifyToken = (token?: string): { sub: string; [key: string]: any } | null => {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    if (isPlainObject(payload)) {
      return payload as { sub: string }; // Ensure the payload has the required structure
    }
    throw new Error('Token payload is not a plain object');
  } catch (error) {
    throw new InvalidTokenError('Invalid or expired token');
  }
};
