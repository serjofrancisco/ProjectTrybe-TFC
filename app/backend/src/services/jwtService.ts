import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class JwtService {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'MinhaSenha', { expiresIn: '30d' });
  }
}
