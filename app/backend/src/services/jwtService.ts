import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import ILogin from '../interfaces/ILogin';
import CustomError from '../middlewares/CustomError';

export default class JwtService {
  static sign(payload: ILogin): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'MinhaSenha', { expiresIn: '30d' });
  }

  static decode(token: string | undefined) {
    try {
      if (!token) throw new CustomError(401, 'Token not found');
      const data = jwt.verify(token, process.env.JWT_SECRET || 'MinhaSenha');
      return data;
    } catch (_err) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  }
}
