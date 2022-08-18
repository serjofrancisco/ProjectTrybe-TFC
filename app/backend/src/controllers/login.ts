import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.sign({ email, password });
    return res.status(StatusCodes.OK).json({ token });
  }
}
