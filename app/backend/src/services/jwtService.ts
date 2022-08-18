import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import ILogin from '../interfaces/ILogin';

export default class JwtService {
  static sign(payload: ILogin): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'MinhaSenha', { expiresIn: '30d' });
  }
}
