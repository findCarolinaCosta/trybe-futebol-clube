import { NextFunction, Request, Response } from 'express';
import { ILoginService, ILoginInfo,
  ILoginController, ILoggedUser } from '../interfaces/loginInterface';

class Login implements ILoginController {
  readonly _loginService: ILoginService;

  constructor(service: ILoginService) {
    this._loginService = service;
  }

  public getLogin = async (req: Request, res: Response, next: NextFunction):
  Promise<void | Response<ILoggedUser>> => {
    try {
      const loginInfo: ILoginInfo = req.body;
      const loggedUser: ILoggedUser | null = await this._loginService.getLogin(loginInfo);

      if (!loggedUser) {
        return next({ status: 401, message: 'Incorrect email or password' });
      }

      return res.status(200).json(loggedUser);
    } catch (error) {
      next(error);
    }
  };
}

export default Login;
