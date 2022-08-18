import { Router } from 'express';
import LoginController from '../controllers/login';
import LoginValidator from '../middlewares/LoginValidator';

const loginRouter = Router();

loginRouter.post('/', LoginValidator.validate, LoginController.login);

export default loginRouter;
