import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';

export default class PasswordHandler {
  static passwordEncrypt(password: string) {
    const salt = bcrypt.genSaltSync(6);

    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static passwordCompare(password: string, passwordDb: string) {
    const isValid = bcrypt.compareSync(password, passwordDb);
    if (!isValid) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Invalid password');
    }
    return isValid;
  }
}
