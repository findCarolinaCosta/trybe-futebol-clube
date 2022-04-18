import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validateToken } from '../utils/jwtGenerator';
import { ILoginInfo, ILoginMiddleware } from '../interfaces/loginInterface';
import validateSchema from '../utils/validateSchema';
import loginSchema from '../schemas/login';
import { IError } from '../interfaces/errorInterface';

class LoginMidlewares implements ILoginMiddleware {
  validateLogin = (req: Request, _res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    const error: IError | void = validateSchema<ILoginInfo>({ email, password }, loginSchema);

    if (error) return next(error);

    return next();
  };

  getValidate = async (req: Request, res: Response, next: NextFunction):
  Promise<void | Response<JwtPayload>> => {
    const token: string | undefined = req.headers.authorization;

    if (!token) return next({ status: 401, message: 'Token not found' });

    const decoded = await validateToken(token) as JwtPayload;

    if (!decoded?.data) return next({ status: 401, message: 'Invalid token' });

    return res.status(200).json(decoded.data.role);
  };
}

export default LoginMidlewares;
