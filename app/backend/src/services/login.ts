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
}
