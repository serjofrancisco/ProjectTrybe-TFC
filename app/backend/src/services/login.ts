import ILogin from '../interfaces/ILogin';
import JwtService from './jwtService';

export default class LoginService {
  static async sign(payload: ILogin): Promise<string> {
    const token = JwtService.sign(payload);
    return token;
  }
}
