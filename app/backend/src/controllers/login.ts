import { NextFunction, Request, Response } from 'express';
import { ILoginService, ILoginInfo, ILoginController } from '../interfaces/loginInterface';

class Login implements ILoginController {
  readonly _loginService: ILoginService;

  constructor(service: ILoginService) {
    this._loginService = service;
  }

  public getLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginInfo: ILoginInfo = req.body;
      const loggedUser = await this._loginService.getLogin(loginInfo);

      return res.status(200).json(loggedUser);
    } catch (error) {
      next(error);
    }
  };
}

export default Login;
