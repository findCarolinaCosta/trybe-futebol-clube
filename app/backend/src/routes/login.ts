import { Router } from 'express';
import { ILoginController } from '../interfaces/loginInterface';
import LoginController from '../controllers/login';
import { LoginMiddleware } from '../middlewares';
import User from '../database/models/user';
import LoginService from '../services/login';

const router: Router = Router();

const Login: ILoginController = new LoginController(new LoginService(User));

router.post(
  '/login',
  LoginMiddleware.validateLogin,
  Login.getLogin,
);

router.get(
  '/login/validate',
  LoginMiddleware.getValidate,
);

export default router;
