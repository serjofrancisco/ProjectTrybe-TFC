import ILogin from '../interfaces/ILogin';
import JwtService from './jwtService';
import Users from '../database/models/user';
import CustomError from '../middlewares/CustomError';
import PasswordHandler from '../utils/passwordHandler';

export default class LoginService {
  static async sign(payload: ILogin): Promise<string> {
    const email = await Users.findOne({ where: { email: payload.email } });

    if (!email) throw new CustomError(401, 'Incorrect email or password');

    PasswordHandler.passwordCompare(payload.password, email.password);

    const token = JwtService.sign(payload);
    return token;
  }

  static async verify(token: string | undefined) {
    if (!token) throw new CustomError(401, 'Unauthorized');
    const payload = JwtService.decode(token);
    const user = await Users.findOne({ where: { email: payload.email } }) as Users;
    return { role: user.role };
  }
}
