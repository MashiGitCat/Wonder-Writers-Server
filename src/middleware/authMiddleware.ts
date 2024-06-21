import { Request, Response, NextFunction } from 'express';
import { expressjwt as jwt } from 'express-jwt';

export interface AuthRequest extends Request {
    auth: {
      userId: string;
    };
  }
export const requireAuth = jwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  requestProperty: 'auth', 
  getToken: (req: Request) => req.headers.authorization?.split(' ')[1]
});


