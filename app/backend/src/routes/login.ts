import { Router } from 'express';
import LoginController from '../controllers/login';
import { LoginMiddleware } from '../middlewares';
import User from '../database/models/user';
import LoginService from '../services/login';

const router = Router();

const LoginModel = new User();
const Login = new LoginController(new LoginService(LoginModel));

router.post(
  '/login',
  LoginMiddleware.validateLogin,
  Login.getLogin,
);
export default router;
