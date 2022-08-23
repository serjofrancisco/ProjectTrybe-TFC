import { NextFunction, Request, Response } from 'express';
import JwtService from '../services/jwtService';

export default class TokenValidator {
  static async validate(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    JwtService.decode(token);
    next();
  }
}
