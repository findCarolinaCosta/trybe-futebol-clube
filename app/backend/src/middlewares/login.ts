import { Request, Response, NextFunction } from 'express';
import { ILoginInfo } from '../interfaces/loginInterface';
import validateSchema from '../utils/validateSchema';
import loginSchema from '../schemas/login';
import { IError } from '../interfaces/errorInterface';

class LoginMidlewares {
  validateLogin = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const error: IError | void = validateSchema<ILoginInfo>({ email, password }, loginSchema);

    if (error) return next(error);

    return next();
  };
}

export default LoginMidlewares;
